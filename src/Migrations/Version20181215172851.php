<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181215172851 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE cities DROP FOREIGN KEY cities_department_code_foreign');
        $this->addSql('ALTER TABLE departments DROP FOREIGN KEY departments_region_code_foreign');
        $this->addSql('DROP TABLE cities');
        $this->addSql('DROP TABLE departments');
        $this->addSql('DROP TABLE regions');
        $this->addSql('ALTER TABLE activity CHANGE created created DATETIME DEFAULT NULL, CHANGE city city VARCHAR(255) DEFAULT NULL, CHANGE country country VARCHAR(255) DEFAULT NULL, CHANGE date date DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE cities (id INT UNSIGNED AUTO_INCREMENT NOT NULL, department_code VARCHAR(3) NOT NULL COLLATE utf8mb4_unicode_ci, insee_code VARCHAR(5) DEFAULT NULL COLLATE utf8mb4_unicode_ci, zip_code VARCHAR(5) DEFAULT NULL COLLATE utf8mb4_unicode_ci, name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, slug VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, gps_lat DOUBLE PRECISION NOT NULL, gps_lng DOUBLE PRECISION NOT NULL, INDEX cities_department_code_foreign (department_code), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE departments (id INT UNSIGNED AUTO_INCREMENT NOT NULL, region_code VARCHAR(3) NOT NULL COLLATE utf8mb4_unicode_ci, code VARCHAR(3) NOT NULL COLLATE utf8mb4_unicode_ci, name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, slug VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, INDEX departments_region_code_foreign (region_code), INDEX departments_code_index (code), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE regions (id INT UNSIGNED AUTO_INCREMENT NOT NULL, code VARCHAR(3) NOT NULL COLLATE utf8mb4_unicode_ci, name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, slug VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, UNIQUE INDEX regions_code_unique (code), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE cities ADD CONSTRAINT cities_department_code_foreign FOREIGN KEY (department_code) REFERENCES departments (code) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE departments ADD CONSTRAINT departments_region_code_foreign FOREIGN KEY (region_code) REFERENCES regions (code) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE activity CHANGE created created DATETIME NOT NULL, CHANGE city city VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE country country VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE date date DATETIME NOT NULL');
    }
}
