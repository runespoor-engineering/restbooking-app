export default (name, modals = []) => modals.find((modal) => modal.attributes.name === name);
