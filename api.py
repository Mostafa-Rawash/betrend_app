# STANDARD_USERS = frappe.STANDARD_USERS

import frappe
from frappe import auth
from frappe.website.utils import is_signup_disabled
from frappe import throw, msgprint, _
from frappe.utils import (cint, flt, has_gravatar, escape_html, format_datetime,

@frappe.whitelist( allow_guest=True )
def login(usr, pwd):
    try:
        login_manager = frappe.auth.LoginManager()
        login_manager.authenticate(user=usr, pwd=pwd)
        login_manager.post_login()
    except frappe.exceptions.AuthenticationError:
        frappe.clear_messages()
        frappe.local.response["message"] = {
            "success_key":0,
            "message":"Authentication Error!"
        }

        return

    api_generate = generate_keys(frappe.session.user)
    user = frappe.get_doc('User', frappe.session.user)

    frappe.response["message"] = {
        "success_key":1,
        "message":"Authentication success",
        "sid":frappe.session.sid,
        "api_key":user.api_key,
        "api_secret":api_generate,
        "username":user.username,
        "email":user.email
    }



def generate_keys(user):
    user_details = frappe.get_doc('User', user)
    api_secret = frappe.generate_hash(length=15)

    if not user_details.api_key:
        api_key = frappe.generate_hash(length=15)
        user_details.api_key = api_key

    user_details.api_secret = api_secret
    user_details.save()

    return api_secret



# def sign_up(email, full_name, redirect_to = 0 ):
@frappe.whitelist( allow_guest=True )
def sign_up(email, full_name, redirect_to =0 , pwd = 0) :
	if is_signup_disabled():
		frappe.throw(_("Sign Up is disabled"), title=_("Not Allowed"))

	user = frappe.db.get("User", {"email": email})
	if user:
		if user.enabled:
			return 0, _("Already Registered")
		else:
			return 0, _("Registered but disabled")
	else:
		if frappe.db.get_creation_count('User', 60) > 300:
			frappe.respond_as_web_page(_('Temporarily Disabled'),
				_('Too many users signed up recently, so the registration is disabled. Please try back in an hour'),
				http_status_code=429)
		if pwd:
			user = frappe.get_doc({
				"doctype":"User",
				"email": email,
				"first_name": escape_html(full_name),
				"enabled": 1,
				"new_password": pwd,
				"user_type": "Website User"
			})
		else:
			# from frappe.utils import random_string
			user = frappe.get_doc({
				"doctype":"User",
				"email": email,
				"first_name": escape_html(full_name),
				"enabled": 1,
				"new_password": pwd,
				"user_type": "Website User"
			})
		user.flags.ignore_permissions = True
		user.flags.ignore_password_policy = True
		user.insert()

		# set default signup role as per Portal Settings
		default_role = frappe.db.get_value("Portal Settings", None, "default_role")
		if default_role:
			user.add_roles(default_role)

		if redirect_to:
			frappe.cache().hset('redirect_after_login', user.name, redirect_to)

		# if user.flags.email_sent:
		# 	return 1, _("Please check your email for verification")
		# else:
		# 	return 2, _("Please ask your administrator to verify your sign-up")
