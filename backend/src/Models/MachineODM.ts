import mongoose, { Schema, isObjectIdOrHexString } from 'mongoose';
import IMachine, { ICreateMachineParams } from '../Interfaces/IMachine';
import AbstractODM from './AbstractODM';

export default class MachineODM extends AbstractODM<IMachine> {
  constructor() {
    const schema = new Schema<IMachine>({
      name: { type: String, required: true },
      type: { type: String, required: true },
      userId: { type: String, required: true },
    });
    super(schema, 'Machine');
  }

  public async create(machine: ICreateMachineParams): Promise<IMachine> {
    const { _id, name, type, userId } = await this.model.create(machine);
    return { id: _id.toHexString(), name, type, userId };
  }

  public async listAll(userId: string): Promise<IMachine[] | null> {
    const machines = await this.model.find({ userId });
    return machines.map((m) => ({
      id: m._id.toHexString(),
      name: m.name,
      type: m.type,
      userId: m.userId,
    }));
  }

  public async findById(id: string): Promise<IMachine | null> {
    if (!isObjectIdOrHexString(id)) {
      throw new Error('Invalid machine ID format');
    }

    const _id = new mongoose.Types.ObjectId(id);
    const machine = await this.model.findOne({ _id });

    if (machine) {
      const { _id, name, type, userId } = machine;

      return new Promise((resolve) => {
        resolve({ id: _id.toHexString(), name, type, userId });
      });
    }
    throw new Error('Machine ID not found');
  }
}
