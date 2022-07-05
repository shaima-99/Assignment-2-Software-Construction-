const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class StoreModel {
  constructor() {
    if (this.instance) return this.instance;
    StoreModel.instance = this;
  }

  get() {
    return database.getList("store");
  }

  getById(id) {
    return database.get("store", id);
  }

  create(todo) {
    return database.create("store", todo);
  }

  delete(id) {
    return database.delete("store", id);
  }

  update(id, todo) {
    return database.set("store", id, todo);
  }
}

module.exports = new StoreModel();
