(() => {
  'use strict';
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
