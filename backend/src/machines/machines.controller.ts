import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachineDto } from './create-machine.dto';
import { AddMonitoringPointsDto } from './add-monitoring-points.dto';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Get()
  async getMachines() {
    return this.machinesService.getMachines();
  }

  @Post()
  async createMachine(@Body() createMachineDto: CreateMachineDto) {
    return this.machinesService.createMachine(createMachineDto);
  }

  @Get('sensors')
  async getSensors() {
    return this.machinesService.getSensors();
  }

  @Post(':machineId/monitoring-points')
  async addMonitoringPoints(
    @Param('machineId') machineId: string,
    @Body() addMonitoringPointsDto: AddMonitoringPointsDto,
  ) {
    return this.machinesService.addMonitoringPoints(
      machineId,
      addMonitoringPointsDto,
    );
  }

  @Delete(':machineId')
  async deleteMachine(@Param('machineId') machineId: string) {
    return this.machinesService.deleteMachine(machineId);
  }

  // DELETE endpoint to delete a monitoring point
  @Delete(':machineId/monitoring-points/:monitoringPointId')
  async deleteMonitoringPoint(
    @Param('machineId') machineId: string,
    @Param('monitoringPointId') monitoringPointId: string,
  ) {
    return this.machinesService.deleteMonitoringPoint(
      machineId,
      monitoringPointId,
    );
  }
}
