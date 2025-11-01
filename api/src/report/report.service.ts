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

    // Calcular IMC automaticamente se peso e altura forem fornecidos
    let calculatedImc = createReportDto.imc;
    if (createReportDto.weight && createReportDto.height && !createReportDto.imc) {
      // IMC = peso (kg) / (altura em metros)²
      const heightInMeters = createReportDto.height / 100;
      calculatedImc = createReportDto.weight / (heightInMeters * heightInMeters);
      calculatedImc = Math.round(calculatedImc * 100) / 100; // Arredondar para 2 casas decimais
    }

    // Adicionar createdBy automaticamente (quem está criando)
    const dataWithCreator = {
      ...createReportDto,
      createdBy: profile.id,
      imc: calculatedImc,
    };

    return this.reportFunctions.createReport(dataWithCreator);
  }

  async findAll(
    profile: {
      id: string;
      email: string;
      role: number;
      name: string;
    },
    filters?: {
      profileId?: string;
      from?: string;
      to?: string;
    },
  ) {
    if (profile.role === ROLE.ADMIN && filters) {
      return this.reportFunctions.getReportsWithFilters(filters);
    }

    if (profile.role === ROLE.ADMIN) {
      return this.reportFunctions.getAllReports();
    }
    
    if (profile.role === ROLE.TRAINER) {
      return this.reportFunctions.getReportsByTrainer(
        profile.id,
        filters?.profileId,
      );
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
      if (found.Trainee.trainerId !== profile.id) {
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
      if (found.Trainee.trainerId !== profile.id) {
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
      if (found.Trainee.trainerId !== profile.id) {
        throw new NotFoundException('Relatório não encontrado');
      }
    }
    // ADMIN pode deletar qualquer relatório (não precisa validação)

    return this.reportFunctions.deleteReport(id);
  }
}
