# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161120200214) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "course_users", force: :cascade do |t|
    t.integer  "course_id",  null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id", "user_id"], name: "index_course_users_on_course_id_and_user_id", unique: true, using: :btree
    t.index ["course_id"], name: "index_course_users_on_course_id", using: :btree
    t.index ["user_id"], name: "index_course_users_on_user_id", using: :btree
  end

  create_table "courses", force: :cascade do |t|
    t.string   "department", null: false
    t.integer  "number",     null: false
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "flash_card_sets", force: :cascade do |t|
    t.integer  "study_group_id"
    t.boolean  "public",         default: false
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "user_id"
    t.index ["study_group_id"], name: "index_flash_card_sets_on_study_group_id", using: :btree
    t.index ["user_id"], name: "index_flash_card_sets_on_user_id", using: :btree
  end

  create_table "flash_cards", force: :cascade do |t|
    t.integer  "flash_card_set_id", null: false
    t.string   "question",          null: false
    t.string   "answer"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["flash_card_set_id"], name: "index_flash_cards_on_flash_card_set_id", using: :btree
  end

  create_table "memberships", force: :cascade do |t|
    t.integer  "user_id",                    null: false
    t.integer  "study_group_id",             null: false
    t.integer  "role",           default: 0
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["study_group_id"], name: "index_memberships_on_study_group_id", using: :btree
    t.index ["user_id", "study_group_id"], name: "index_memberships_on_user_id_and_study_group_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_memberships_on_user_id", using: :btree
  end

  create_table "study_groups", force: :cascade do |t|
    t.integer  "course_id"
    t.string   "name",                                  null: false
    t.boolean  "accepting_new_members", default: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.index ["course_id"], name: "index_study_groups_on_course_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "first_name",      null: false
    t.string   "last_name",       null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

  add_foreign_key "course_users", "courses"
  add_foreign_key "course_users", "users"
  add_foreign_key "flash_card_sets", "study_groups"
  add_foreign_key "flash_cards", "flash_card_sets"
  add_foreign_key "memberships", "study_groups"
  add_foreign_key "memberships", "users"
  add_foreign_key "study_groups", "courses"
end
