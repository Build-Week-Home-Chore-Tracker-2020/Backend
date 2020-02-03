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
      tbl
        .integer("parent_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("parent")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl.string("role");
      tbl.integer("total_points").defaultTo(0);
      tbl.integer("current_streaks").defaultTo(0);
      tbl.integer("highest_points").defaultTo(0);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("child").dropTableIfExists("parent");
};
