import { MigrationInterface, QueryRunner } from "typeorm"

export class Default1710182005258 implements MigrationInterface {
    name = "1710182005258"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "cpf" character varying(11) NOT NULL, "email" character varying(255) NOT NULL, "birthdate" date NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`)
    }
}
