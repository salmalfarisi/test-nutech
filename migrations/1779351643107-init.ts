import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1779351643107 implements MigrationInterface {
    name = 'Init1779351643107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer NOT NULL, "service_code" varchar, "service_name" varchar, "invoice_number" varchar NOT NULL, "transaction_type" varchar NOT NULL, "description" varchar, "total_amount" real NOT NULL, "status" varchar NOT NULL DEFAULT ('SUCCESS'), "created_on" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_14b6b642161e84ddddc7fb85391" UNIQUE ("invoice_number"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "password" varchar NOT NULL, "profile_image" varchar, "balance" real NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "service_code" varchar NOT NULL, "service_name" varchar NOT NULL, "service_icon" varchar, "service_tariff" real NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_f05131015973a4c74d7052b69ab" UNIQUE ("service_code"))`);
        await queryRunner.query(`CREATE TABLE "banners" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "banner_name" varchar NOT NULL, "banner_image" varchar NOT NULL, "description" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer NOT NULL, "service_code" varchar, "service_name" varchar, "invoice_number" varchar NOT NULL, "transaction_type" varchar NOT NULL, "description" varchar, "total_amount" real NOT NULL, "status" varchar NOT NULL DEFAULT ('SUCCESS'), "created_on" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_14b6b642161e84ddddc7fb85391" UNIQUE ("invoice_number"), CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transactions"("id", "user_id", "service_code", "service_name", "invoice_number", "transaction_type", "description", "total_amount", "status", "created_on") SELECT "id", "user_id", "service_code", "service_name", "invoice_number", "transaction_type", "description", "total_amount", "status", "created_on" FROM "transactions"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_transactions" RENAME TO "transactions"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" RENAME TO "temporary_transactions"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer NOT NULL, "service_code" varchar, "service_name" varchar, "invoice_number" varchar NOT NULL, "transaction_type" varchar NOT NULL, "description" varchar, "total_amount" real NOT NULL, "status" varchar NOT NULL DEFAULT ('SUCCESS'), "created_on" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_14b6b642161e84ddddc7fb85391" UNIQUE ("invoice_number"))`);
        await queryRunner.query(`INSERT INTO "transactions"("id", "user_id", "service_code", "service_name", "invoice_number", "transaction_type", "description", "total_amount", "status", "created_on") SELECT "id", "user_id", "service_code", "service_name", "invoice_number", "transaction_type", "description", "total_amount", "status", "created_on" FROM "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "banners"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
