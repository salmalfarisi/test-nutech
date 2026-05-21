import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1779377035159 implements MigrationInterface {
    name = 'Auto1779377035159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "password" character varying NOT NULL, "profile_image" character varying, "balance" real NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "service_code" character varying NOT NULL, "service_name" character varying NOT NULL, "service_icon" character varying, "service_tariff" real NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f05131015973a4c74d7052b69ab" UNIQUE ("service_code"), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "banners" ("id" SERIAL NOT NULL, "banner_name" character varying NOT NULL, "banner_image" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e9b186b959296fcb940790d31c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "service_code" character varying, "service_name" character varying, "invoice_number" character varying NOT NULL, "transaction_type" character varying NOT NULL, "description" character varying, "total_amount" real NOT NULL, "status" character varying NOT NULL DEFAULT 'SUCCESS', "created_on" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_14b6b642161e84ddddc7fb85391" UNIQUE ("invoice_number"), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "banners"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
