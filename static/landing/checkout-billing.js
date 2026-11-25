(() => {
  'use strict';
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
