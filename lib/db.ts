"use server";

import create from "./client";
import { Repository } from "redis-om";
import { carScheme, companyScheme } from "./scheme";

export const getCarRepository = async () => {
  const redis = await create();
  const repo = new Repository(carScheme, redis);
  await repo.createIndex();
  return repo;
};

export const getCompanyRepository = async () => {
  const redis = await create();
  
  const repo = new Repository(companyScheme, redis);
  await repo.createIndex();
  return repo;
};

export async function getCars() {
    const carRepository = await getCarRepository();
  return await carRepository.search().return.all();
}

export async function getCompanies() {
    const companyRepository = await getCompanyRepository();
    return await companyRepository.search().return.all();
}

export async function getCompany(company: string) {
    const companyRepository = await getCompanyRepository()
    return await companyRepository.search().where('name').equals(company).return.first()
}