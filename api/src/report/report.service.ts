import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportFunctionsService } from './report-functions/report-functions.service';
import { ROLE } from 'src/decorators';

@Injectable()
export class ReportService {
  constructor(private readonly reportFunctions: ReportFunctionsService) {}

  async create(
    createReportDto: CreateReportDto,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    // Se for TRAINER, só pode criar para seus alunos
    if (profile.role === ROLE.TRAINER) {
      // Verificar se o profileId do relatório é um aluno do trainer
      const hasAccess = await this.reportFunctions.verifyTraineeOwnership(
        createReportDto.profileId,
        profile.id,
      );
      if (!hasAccess) {
        throw new NotFoundException('Perfil não encontrado');
      }
    }

    return this.reportFunctions.createReport(createReportDto);
  }

  async findAll(profile: {
    id: string;
    email: string;
    role: number;
    name: string;
  }) {
    if (profile.role === ROLE.ADMIN) {
      return this.reportFunctions.getAllReports();
    }
    
    if (profile.role === ROLE.TRAINER) {
      return this.reportFunctions.getReportsByTrainer(profile.id);
    }
    
    // TRAINEE
    return this.reportFunctions.getReportsByTrainee(profile.id);
  }

  async findOne(
    id: string,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    const found = await this.reportFunctions.getReportById(id);
    if (!found) {
      throw new NotFoundException('Relatório não encontrado');
    }

    if (profile.role === ROLE.ADMIN) {
      return found;
    }

    if (profile.role === ROLE.TRAINER) {
      // TRAINER pode ver relatórios de seus alunos
      if (found.Profile.trainerId !== profile.id) {
        throw new NotFoundException('Relatório não encontrado');
      }
      return found;
    }

    // TRAINEE pode ver apenas seus próprios relatórios
    if (found.profileId !== profile.id) {
      throw new NotFoundException('Relatório não encontrado');
    }

    return found;
  }

  async update(
    id: string,
    updateReportDto: UpdateReportDto,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    const found = await this.reportFunctions.getReportById(id);
    if (!found) {
      throw new NotFoundException('Relatório não encontrado');
    }

    if (profile.role === ROLE.TRAINER) {
      // TRAINER pode atualizar apenas relatórios de seus alunos
      if (found.Profile.trainerId !== profile.id) {
        throw new NotFoundException('Relatório não encontrado');
      }
    }
    // ADMIN pode atualizar qualquer relatório (não precisa validação)

    return this.reportFunctions.updateReport(id, updateReportDto);
  }

  async remove(
    id: string,
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
  ) {
    const found = await this.reportFunctions.getReportById(id);
    if (!found) {
      throw new NotFoundException('Relatório não encontrado');
    }

    if (profile.role === ROLE.TRAINER) {
      // TRAINER pode deletar apenas relatórios de seus alunos
      if (found.Profile.trainerId !== profile.id) {
        throw new NotFoundException('Relatório não encontrado');
      }
    }
    // ADMIN pode deletar qualquer relatório (não precisa validação)

    return this.reportFunctions.deleteReport(id);
  }
}
