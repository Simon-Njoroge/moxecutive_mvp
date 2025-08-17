-- Moxecutive Media Database Schema
-- Based on the provided database diagram

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id BIGINT,
    avatar_url TEXT,
    status VARCHAR(50) DEFAULT 'active',
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    permissions JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    template VARCHAR(100),
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sections table
CREATE TABLE IF NOT EXISTS sections (
    id BIGSERIAL PRIMARY KEY,
    page_id BIGINT REFERENCES pages(id) ON DELETE CASCADE,
    section_type VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    body TEXT,
    media_id BIGINT,
    order_position INT,
    settings JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media Library table
CREATE TABLE IF NOT EXISTS media_library (
    id BIGSERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(20) NOT NULL,
    mime_type VARCHAR(100),
    file_size BIGINT,
    caption TEXT,
    uploaded_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description TEXT,
    full_description TEXT,
    icon_id BIGINT,
    order_position INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio Items table
CREATE TABLE IF NOT EXISTS portfolio_items (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT,
    service_id BIGINT REFERENCES services(id),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    preview_media_id BIGINT,
    main_media_id BIGINT,
    hover_media_id BIGINT,
    external_link TEXT,
    order_position INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio Categories table
CREATE TABLE IF NOT EXISTS portfolio_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio Tags table
CREATE TABLE IF NOT EXISTS portfolio_tags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL
);

-- Portfolio Item Tags (junction table)
CREATE TABLE IF NOT EXISTS portfolio_item_tags (
    portfolio_item_id BIGINT REFERENCES portfolio_items(id) ON DELETE CASCADE,
    tag_id BIGINT REFERENCES portfolio_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (portfolio_item_id, tag_id)
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_id BIGINT,
    website_url TEXT,
    order_position INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    role VARCHAR(255),
    message TEXT NOT NULL,
    photo_id BIGINT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team Members table
CREATE TABLE IF NOT EXISTS team_members (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    bio TEXT,
    photo_id BIGINT,
    social_links JSON,
    order_position INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
    id BIGSERIAL PRIMARY KEY,
    category VARCHAR(100),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    order_position INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Awards table
CREATE TABLE IF NOT EXISTS awards (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    award_date DATE,
    media_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kenya Coverage table (location-specific)
CREATE TABLE IF NOT EXISTS kenya_coverage (
    id BIGSERIAL PRIMARY KEY,
    county_name VARCHAR(255) NOT NULL,
    coverage_status VARCHAR(50) DEFAULT 'active',
    highlight_color VARCHAR(7),
    notes TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEO Meta table
CREATE TABLE IF NOT EXISTS seo_meta (
    id BIGSERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL, -- 'page', 'service', 'portfolio_item', etc.
    entity_id BIGINT NOT NULL,
    meta_description TEXT,
    meta_keywords TEXT,
    og_image_id BIGINT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Revisions table (for content versioning)
CREATE TABLE IF NOT EXISTS revisions (
    id BIGSERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT NOT NULL,
    data_snapshot JSON NOT NULL,
    edited_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id BIGSERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT,
    views INT DEFAULT 0,
    clicks INT DEFAULT 0,
    last_viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Section Items table (for flexible content within sections)
CREATE TABLE IF NOT EXISTS section_items (
    id BIGSERIAL PRIMARY KEY,
    section_id BIGINT REFERENCES sections(id) ON DELETE CASCADE,
    title VARCHAR(255),
    description TEXT,
    media_id BIGINT,
    link_url TEXT,
    order_position INT,
    settings JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key constraints
ALTER TABLE users ADD CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id);
ALTER TABLE sections ADD CONSTRAINT fk_sections_media FOREIGN KEY (media_id) REFERENCES media_library(id);
ALTER TABLE services ADD CONSTRAINT fk_services_icon FOREIGN KEY (icon_id) REFERENCES media_library(id);
ALTER TABLE portfolio_items ADD CONSTRAINT fk_portfolio_category FOREIGN KEY (category_id) REFERENCES portfolio_categories(id);
ALTER TABLE portfolio_items ADD CONSTRAINT fk_portfolio_preview_media FOREIGN KEY (preview_media_id) REFERENCES media_library(id);
ALTER TABLE portfolio_items ADD CONSTRAINT fk_portfolio_main_media FOREIGN KEY (main_media_id) REFERENCES media_library(id);
ALTER TABLE portfolio_items ADD CONSTRAINT fk_portfolio_hover_media FOREIGN KEY (hover_media_id) REFERENCES media_library(id);
ALTER TABLE clients ADD CONSTRAINT fk_clients_logo FOREIGN KEY (logo_id) REFERENCES media_library(id);
ALTER TABLE testimonials ADD CONSTRAINT fk_testimonials_photo FOREIGN KEY (photo_id) REFERENCES media_library(id);
ALTER TABLE team_members ADD CONSTRAINT fk_team_photo FOREIGN KEY (photo_id) REFERENCES media_library(id);
ALTER TABLE awards ADD CONSTRAINT fk_awards_media FOREIGN KEY (media_id) REFERENCES media_library(id);
ALTER TABLE seo_meta ADD CONSTRAINT fk_seo_og_image FOREIGN KEY (og_image_id) REFERENCES media_library(id);
ALTER TABLE section_items ADD CONSTRAINT fk_section_items_media FOREIGN KEY (media_id) REFERENCES media_library(id);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role_id);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_sections_page ON sections(page_id);
CREATE INDEX idx_portfolio_category ON portfolio_items(category_id);
CREATE INDEX idx_portfolio_service ON portfolio_items(service_id);
CREATE INDEX idx_testimonials_status ON testimonials(status);
CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_analytics_entity ON analytics(entity_type, entity_id);
