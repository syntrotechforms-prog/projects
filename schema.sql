-- Create the applications table
CREATE TABLE applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    college TEXT NOT NULL,
    domain TEXT NOT NULL,
    project TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert data (Public Enrollment)
CREATE POLICY "Allow public inserts" ON applications
FOR INSERT TO anon
WITH CHECK (true);

-- Create a policy that allows only authenticated users to view data (Optional)
-- CREATE POLICY "Allow authenticated reads" ON applications
-- FOR SELECT TO authenticated
-- USING (true);
