import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  Identifier,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from "react-admin";
// import { GetListParams, GetListResponse } from "./types";
import { Cookies } from "react-cookie";
const apiUrl = "http://195.158.22.198:5000"; // Replace with your custom API URL
const cookie = new Cookies();

const customDataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const { filter } = params;
    const token = cookie.get("token") ? cookie.get("token") : null;
    const url = `${apiUrl}/${resource}`;
    const query = `?page=${page}&per_page=${perPage}&sort=${field}&order=${order}`;

    try {
      const response = await fetch(url, {
        // method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      return { data: data.message, total: 123 };
    } catch (error) {
      throw new Error("Error fetching data.");
    }
  },
  getOne: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: GetOneParams<RecordType>
  ): Promise<GetOneResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  getMany: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  getManyReference: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  update: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: UpdateParams<any>
  ): Promise<UpdateResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  updateMany: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: UpdateManyParams<any>
  ): Promise<UpdateManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  create: async (resource, params) => {
    try {
      console.log(params);
      const token = cookie.get("token") ? cookie.get("token") : null;
      const url = `${apiUrl}/${resource}/add`;
      const request = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(params.data),
      });
      const data = await request.json();
      console.log(data);
      return {
        data: data.message,
      };
    } catch (error) {
      throw new Error("Error fetching data.");
    }
  },
  delete: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: DeleteParams<RecordType>
  ): Promise<DeleteResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  deleteMany: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: DeleteManyParams<RecordType>
  ): Promise<DeleteManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
};

export default customDataProvider;
