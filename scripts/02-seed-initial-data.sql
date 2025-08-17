-- Seed initial data for Moxecutive Media

-- Insert default roles
INSERT INTO roles (name, permissions) VALUES 
('admin', '{"all": true}'),
('editor', '{"content": true, "media": true}'),
('viewer', '{"read": true}')
ON CONFLICT DO NOTHING;

-- Insert default admin user (password should be hashed in production)
INSERT INTO users (first_name, last_name, email, password_hash, role_id, status) VALUES 
('Admin', 'User', 'admin@moxecutive.com', '$2b$10$example_hash', 1, 'active')
ON CONFLICT (email) DO NOTHING;

-- Insert main pages
INSERT INTO pages (slug, title, description, template, status) VALUES 
('home', 'Home', 'Moxecutive Media homepage', 'home', 'published'),
('about', 'About Us', 'Learn about Moxecutive Media', 'about', 'published'),
('services', 'Our Services', 'Comprehensive media solutions', 'services', 'published'),
('portfolio', 'Our Portfolio', 'Showcasing our finest work', 'portfolio', 'published'),
('contact', 'Contact Us', 'Get in touch with us', 'contact', 'published')
ON CONFLICT (slug) DO NOTHING;

-- Insert services
INSERT INTO services (title, slug, short_description, full_description, order_position) VALUES 
('Film & TV Production', 'film-tv-production', 'High-quality video content that amplifies your audience', 'Professional film and television production services including scripting, filming, editing, and post-production. We create compelling visual narratives that engage and inspire your target audience.', 1),
('Graphic Design & Branding', 'graphic-design-branding', 'Creative visual identity solutions that make your brand memorable', 'Comprehensive branding and graphic design services including logo design, brand identity development, marketing materials, and digital assets that establish a strong visual presence for your brand.', 2),
('Event Management', 'event-management', 'Seamless event planning and execution for memorable gatherings', 'Full-service event management from concept to execution. We handle corporate events, product launches, conferences, and special occasions with meticulous attention to detail and creative flair.', 3),
('Media Buying', 'media-buying', 'Strategic media placement to maximize advertising ROI', 'Expert media buying services that optimize your advertising spend across traditional and digital platforms. We negotiate the best rates and placements to ensure maximum reach and engagement.', 4),
('Training & Mentorship', 'training-mentorship', 'Professional development programs to enhance your skills', 'Comprehensive training programs and one-on-one mentorship in media production, marketing, and creative skills. Empower your team with industry-leading expertise and practical knowledge.', 5),
('Photography', 'photography', 'Professional photography services for corporate and commercial needs', 'High-quality photography services including corporate headshots, product photography, event coverage, and commercial shoots. We capture compelling images that tell your brand story.', 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert portfolio categories
INSERT INTO portfolio_categories (name, slug, description) VALUES 
('Film Production', 'film-production', 'Video and film production projects'),
('Branding Projects', 'branding-projects', 'Brand identity and design work'),
('Event Coverage', 'event-coverage', 'Event photography and videography'),
('Commercial Photography', 'commercial-photography', 'Product and corporate photography')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, company, role, message, rating, status) VALUES 
('Sarah Johnson', 'Tech Innovations Ltd', 'Marketing Director', 'Moxecutive Media transformed our brand presence with exceptional video content and strategic media buying.', 5, 'active'),
('Michael Chen', 'Global Events Co', 'CEO', 'Professional, creative, and results-driven. Their event management services exceeded our expectations.', 5, 'active'),
('Emma Rodriguez', 'Startup Hub', 'Founder', 'Their branding expertise helped us establish a strong market presence. Highly recommended!', 5, 'active')
ON CONFLICT DO NOTHING;

-- Insert FAQs
INSERT INTO faqs (category, question, answer, status, order_position) VALUES 
('General', 'What services does Moxecutive Media offer?', 'We offer comprehensive media solutions including film & TV production, graphic design & branding, event management, media buying, training & mentorship, and professional photography.', 'active', 1),
('Production', 'How long does a typical video production take?', 'Production timelines vary based on project complexity. Simple projects may take 2-4 weeks, while complex productions can take 6-12 weeks from concept to final delivery.', 'active', 2),
('Pricing', 'Do you offer package deals for multiple services?', 'Yes, we offer customized packages that combine multiple services for better value. Contact us to discuss your specific needs and receive a tailored quote.', 'active', 3),
('Process', 'What is your creative process?', 'Our process begins with understanding your vision and goals, followed by concept development, production planning, execution, and final delivery with revisions as needed.', 'active', 4)
ON CONFLICT DO NOTHING;

-- Insert sample Kenya coverage data
INSERT INTO kenya_coverage (county_name, coverage_status, highlight_color) VALUES 
('Nairobi', 'active', '#dc2626'),
('Mombasa', 'active', '#dc2626'),
('Kisumu', 'active', '#f59e0b'),
('Nakuru', 'active', '#f59e0b'),
('Eldoret', 'limited', '#6b7280')
ON CONFLICT DO NOTHING;
