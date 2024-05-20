/**
 * Define if the modal with provided name exists.
 * @param {string} modalName Probably the 'modal.name' property.
 * @param {array} modalsCollection The array of all the available modals for current brand.
 * @returns {boolean} true or false value that means if modalsCollection contains the modal with provided name.
 */
const isModalAvailable = (modalName, modalsCollection = []) =>
  !!modalsCollection.find((modal) => modal.attributes.name === modalName);

export default isModalAvailable;
