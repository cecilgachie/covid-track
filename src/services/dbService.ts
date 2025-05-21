import { prisma } from '@/lib/prisma';
import { User, Agency, Category, Complaint, ComplaintResponse } from '@prisma/client';

export const dbService = {
  // User operations
  async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    return prisma.user.create({ data });
  },

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  async findUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  // Agency operations
  async createAgency(data: Omit<Agency, 'id' | 'createdAt' | 'updatedAt'>) {
    return prisma.agency.create({ data });
  },

  async getAgencyById(id: string) {
    return prisma.agency.findUnique({ where: { id } });
  },

  async getAllAgencies() {
    return prisma.agency.findMany();
  },

  // Category operations
  async createCategory(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) {
    return prisma.category.create({ data });
  },

  async getCategoryById(id: string) {
    return prisma.category.findUnique({ where: { id } });
  },

  async getCategoriesByAgency(agencyId: string) {
    return prisma.category.findMany({ where: { agencyId } });
  },

  // Complaint operations
  async createComplaint(data: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'>) {
    return prisma.complaint.create({ data });
  },

  async getComplaintById(id: string) {
    return prisma.complaint.findUnique({
      where: { id },
      include: {
        category: true,
        user: true,
        agency: true,
        responses: {
          include: {
            user: true
          }
        }
      }
    });
  },

  async updateComplaintStatus(id: string, status: string) {
    return prisma.complaint.update({
      where: { id },
      data: { status }
    });
  },

  async assignComplaintToAgency(complaintId: string, agencyId: string) {
    return prisma.complaint.update({
      where: { id: complaintId },
      data: { assignedToAgencyId: agencyId }
    });
  },

  async getComplaintsByUser(userId: string) {
    return prisma.complaint.findMany({
      where: { userId },
      include: {
        category: true,
        agency: true,
        responses: {
          include: {
            user: true
          }
        }
      }
    });
  },

  async getAllComplaints() {
    return prisma.complaint.findMany({
      include: {
        category: true,
        user: true,
        agency: true,
        responses: {
          include: {
            user: true
          }
        }
      }
    });
  },

  // Response operations
  async addResponse(data: Omit<ComplaintResponse, 'id' | 'createdAt'>) {
    return prisma.complaintResponse.create({ data });
  },

  async getResponsesByComplaint(complaintId: string) {
    return prisma.complaintResponse.findMany({
      where: { complaintId },
      include: {
        user: true
      }
    });
  }
}; 