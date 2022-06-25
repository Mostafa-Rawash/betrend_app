import frappe
from frappe import _
import frappe.sessions
from accounting.tenant.doctype.prefrances.prefrances import get_prefrances


def secure_company(company):

    if company is not None:
        if frappe.db.exists("Company", company ):

            company = frappe.get_cached_doc('Company', company)
            company = company.as_dict()
            # this keys cant be exposed to public so we need to clean them
            secure_keys = ['client_id', 'client_secret_1',
                        'client_secret_2', 'signatures']
            for key in list(company.keys()):
                if key in secure_keys:
                    del company[key]
    return company


def website_context(context):
    # we need to give access only for regestered users
    if frappe.session.user == "Guest":
        # pages allowed for gustes
        allowed_for_guest = ["login", "signup", "code-finder"]
        if context.route.lower() not in allowed_for_guest:
            frappe.local.flags.redirect_location = "/login"
            raise frappe.Redirect
 
    context.session = frappe.sessions.get()
    if frappe.session.user != "Guest":
        # next lin add current default comapny for this user
        # in JS : frappe.boot.company
        # in PY : context.session['company']
        context.session['company'] = secure_company( get_prefrances('company') )
        pass

    context.lang = context.session.lang
    context.color = {"white": frappe.get_doc("Color", "white").color,
                     "secondary": frappe.get_doc("Color", "secondary").color,
                     "primary": frappe.get_doc("Color", "primary").color,
                     "dark": frappe.get_doc("Color", "dark").color
                     }

    # frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
    # # if(not hasattr(context, "boot")):
    # boot = frappe.sessions.get_boot_assets_json()
    # boot = frappe.sessions.get()
    # context.time_zone = boot["time_zone"]
    # context.link_title_doctypes = boot["link_title_doctypes"]
    # context.company = get_company()


def boot_session(bootinfo):
    bootinfo.my_global_key = "my_global_value"
