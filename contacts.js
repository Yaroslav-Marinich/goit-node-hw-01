const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "./db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

  const newContact = [...contacts.slice(0, index), ...contacts.slice(index + 1)];  

  await fs.writeFile(contactsPath, JSON.stringify(newContact));

  return "Succefuly deleted contact";
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    ...data,
    id: crypto.randomUUID(),
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
