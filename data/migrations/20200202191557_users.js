exports.up = function(knex) {
  return knex.schema
    .createTable("parent", tbl => {
      tbl.increments();
      tbl
        .string("username", 128)
        .notNullable()
        .unique();
      tbl.string("password").notNullable();
      tbl.string("name").notNullable();
      tbl
        .string("email")
        .notNullable()
        .unique();
      tbl.string("role");
    })
    .createTable("child", tbl => {
      tbl.increments();
      tbl
        .string("username")
        .notNullable()
        .unique();
      tbl.string("password").notNullable();
      tbl.string("name").notNullable();
      tbl.string("role");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("child").dropTableIfExists("parent");
};
