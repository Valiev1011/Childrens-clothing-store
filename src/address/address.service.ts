import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './model/address.model'; // Import your Address model

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address)
    private addressRepository: typeof Address,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    try {
      const address = await this.addressRepository.create(createAddressDto);
      return address;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Address[]> {
    const addresses = await this.addressRepository.findAll();
    return addresses;
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
    });
    return address;
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<[number, Address[]]> {
    const updatedAddresses = await this.addressRepository.update(
      updateAddressDto,
      { where: { id }, returning: true },
    );
    return updatedAddresses;
  }

  async remove(id: number): Promise<number> {
    const deletedAddresses = await this.addressRepository.destroy({
      where: { id },
    });
    return deletedAddresses;
  }
}
