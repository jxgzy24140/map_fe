import http from "@/services/httpService";
import { ICreateOrUpdateMapInputDto } from "@/services/maps/dto";
class MapService {
  public async getAll(clientName = "", fromDate = "") {
    const params = {};
    if (clientName !== "") params["clientName"] = clientName;
    if (fromDate !== "") params["fromDate"] = fromDate;
    const result = await http.get("maps", {
      params: params,
    });
    console.log("result: " + result);
    return result.data;
  }
  public async get(id: string) {
    const result = await http.get(`maps/${id}`);
    return result;
  }
  public async update(id: string, input: ICreateOrUpdateMapInputDto) {
    const result = await http.put(`maps/${id}`, input);
    return result.data;
  }
  // }
  public async delete(id: string) {
    await http.delete(`maps/${id}`);
  }

  public async create(input: ICreateOrUpdateMapInputDto) {
    const newMap = await http.post(`maps`, input);
    return newMap;
  }
}

export default new MapService();
