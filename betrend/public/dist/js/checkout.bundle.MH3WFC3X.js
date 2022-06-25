(() => {
  // frappe/public/js/integrations/razorpay.js
  frappe.provide("frappe.checkout");
  frappe.require("https://checkout.razorpay.com/v1/checkout.js").then(() => {
    frappe.checkout.razorpay = class RazorpayCheckout {
      constructor(opts) {
        Object.assign(this, opts);
      }
      init() {
        frappe.run_serially([
          () => this.get_key(),
          () => this.make_order(),
          () => this.prepare_options(),
          () => this.setup_handler(),
          () => this.show()
        ]);
      }
      show() {
        this.razorpay = new Razorpay(this.options);
        this.razorpay.once("ready", (response) => {
          this.on_open && this.on_open(response);
        });
        this.razorpay.open();
      }
      get_key() {
        return new Promise((resolve) => {
          frappe.call("frappe.integrations.doctype.razorpay_settings.razorpay_settings.get_api_key").then((res) => {
            this.key = res.message;
            resolve(true);
          });
        });
      }
      make_order() {
        return new Promise((resolve) => {
          frappe.call("frappe.integrations.doctype.razorpay_settings.razorpay_settings.get_order", {
            doctype: this.doctype,
            docname: this.docname
          }).then((res) => {
            this.order = res.message;
            resolve(true);
          });
        });
      }
      order_success(response) {
        frappe.call("frappe.integrations.doctype.razorpay_settings.razorpay_settings.order_payment_success", {
          integration_request: this.order.integration_request,
          params: {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          }
        });
      }
      order_fail(response) {
        frappe.call("frappe.integrations.doctype.razorpay_settings.razorpay_settings.order_payment_failure", {
          integration_request: this.order.integration_request,
          params: response
        });
      }
      prepare_options() {
        this.options = {
          "key": this.key,
          "amount": this.order.amount_due,
          "currency": this.order.currency,
          "name": this.name,
          "description": this.description,
          "image": this.image,
          "order_id": this.order.id,
          "prefill": this.prefill,
          "theme": this.theme,
          "modal": this.modal
        };
      }
      setup_handler() {
        this.options.handler = (response) => {
          if (response.error) {
            this.order_fail(response);
            this.on_fail && this.on_fail(response);
          } else if (response.razorpay_payment_id) {
            this.order_success(response);
            this.on_success && this.on_success(response);
          }
        };
      }
    };
  });
})();
//# sourceMappingURL=checkout.bundle.MH3WFC3X.js.map
