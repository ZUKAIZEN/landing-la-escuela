(() => {
  'use strict';
  for (const section of document.querySelectorAll('[data-enrollment-promotion]')) {
    const form = section.closest('form');
    const code = section.querySelector('[name="promotion_code"]');
    const summary = section.querySelector('[data-promotion-summary]');
    const terms = section.querySelector('[data-promotion-terms]');
    const consent = section.querySelector('[name="promotion_consent"]');
    if (!form || !code || !summary || !terms || !consent) continue;
    const update = () => {
      const invited = Boolean(code.value.trim());
      const annual = form.querySelector('[name="plan"]:checked')?.value === 'annual';
      summary.hidden = !invited;
      consent.required = invited;
      terms.textContent = (annual ? section.dataset.promotionAnnual : section.dataset.promotionMonthly) || '';
      const ordinaryTerms = form.querySelector('[data-ordinary-enrollment-terms]');
      if (ordinaryTerms) ordinaryTerms.hidden = invited;
    };
    code.addEventListener('input', () => { consent.checked = false; update(); });
    form.addEventListener('change', event => {
      if (event.target.name === 'plan') { consent.checked = false; update(); }
    });
    update();
  }
  for (const section of document.querySelectorAll('[data-enrollment-v2]')) {
    const sameName = section.querySelector('[name="invoice_to_student"]');
    const legalName = section.querySelector('[data-invoice-legal-name]');
    const input = legalName?.querySelector('input');
    if (!sameName || !legalName || !input) continue;
    const country = section.querySelector('[name="billing_country"]');
    const region = section.querySelector('[name="billing_region"]');
    const regionLabel = section.querySelector('[data-billing-region-label]');
    const updateRegion = () => {
      if (!country || !region || !regionLabel) return;
      region.required = ['ES', 'US', 'CA'].includes(country.value);
      regionLabel.textContent = region.required ? 'Provincia / región *' : 'Provincia / región';
    };
    const update = () => {
      legalName.hidden = sameName.checked;
      input.disabled = sameName.checked;
      input.required = !sameName.checked;
    };
    sameName.addEventListener('change', update);
    country?.addEventListener('change', updateRegion);
    update();
    updateRegion();
  }
  for (const section of document.querySelectorAll('[data-checkout-billing]')) {
    const update = () => {
      const company = section.querySelector('[name="billing_kind"]:checked')?.value === 'company';
      for (const [selector, visible] of [['[data-billing-person]', !company], ['[data-billing-company]', company]]) {
        for (const label of section.querySelectorAll(selector)) {
          label.hidden = !visible;
          const input = label.querySelector('input');
          if (input) {
            input.required = visible;
            input.disabled = !visible;
          }
        }
      }
      section.querySelector('[data-billing-tax-label]').textContent = company ? 'CIF / NIF *' : 'DNI / NIE *';
    };
    section.addEventListener('change', event => {
      if (event.target.name === 'billing_kind') update();
    });
    update();
  }
})();
