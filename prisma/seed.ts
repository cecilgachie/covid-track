import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create test user
  const userPassword = await hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Test User',
      password: userPassword,
      role: 'USER',
    },
  });

  // Create agencies
  const healthAgency = await prisma.agency.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Ministry of Health',
      description: 'Responsible for public health and healthcare services',
    },
  });

  const educationAgency = await prisma.agency.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      name: 'Ministry of Education',
      description: 'Responsible for education policies and services',
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { id: '1' },
      update: {},
      create: {
        id: '1',
        name: 'COVID-19 Testing',
        description: 'Issues related to COVID-19 testing facilities and procedures',
        agencyId: healthAgency.id,
      },
    }),
    prisma.category.upsert({
      where: { id: '2' },
      update: {},
      create: {
        id: '2',
        name: 'Vaccination',
        description: 'Issues related to COVID-19 vaccination programs',
        agencyId: healthAgency.id,
      },
    }),
    prisma.category.upsert({
      where: { id: '3' },
      update: {},
      create: {
        id: '3',
        name: 'Online Learning',
        description: 'Issues related to online education during the pandemic',
        agencyId: educationAgency.id,
      },
    }),
  ]);

  // Create sample complaints
  const complaints = await Promise.all([
    prisma.complaint.create({
      data: {
        title: 'Long wait times at testing center',
        description: 'The wait time at the local testing center is too long, often exceeding 4 hours.',
        status: 'PENDING',
        userId: user.id,
        categoryId: categories[0].id,
        assignedToAgencyId: healthAgency.id,
      },
    }),
    prisma.complaint.create({
      data: {
        title: 'Vaccination appointment issues',
        description: 'Having trouble scheduling a vaccination appointment through the online portal.',
        status: 'IN_PROGRESS',
        userId: user.id,
        categoryId: categories[1].id,
        assignedToAgencyId: healthAgency.id,
      },
    }),
  ]);

  // Create sample responses
  await Promise.all([
    prisma.complaintResponse.create({
      data: {
        complaintId: complaints[0].id,
        userId: admin.id,
        userRole: 'ADMIN',
        message: 'We are working on increasing testing capacity. Thank you for your patience.',
      },
    }),
    prisma.complaintResponse.create({
      data: {
        complaintId: complaints[1].id,
        userId: admin.id,
        userRole: 'ADMIN',
        message: 'Please try using our mobile app for scheduling. If issues persist, contact our support line.',
      },
    }),
  ]);

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 