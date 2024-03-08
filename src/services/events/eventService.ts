import http from "@/services/httpService";
import {
  ICreateOrUpdateEventInputDto,
  EventOutputDto,
} from "@/services/events/dto";
class EventService {
  public async get(id: any): Promise<EventOutputDto> {
    const response = await http.post(`events/${id}`);
    return response.data;
  }

  public async getAll(): Promise<EventOutputDto[]> {
    const response = await http.get("events");
    return response.data;
  }

  public async create(
    input: ICreateOrUpdateEventInputDto
  ): Promise<EventOutputDto> {
    const response = await http.post("events", input);
    return response.data;
  }

  public async update(
    id: any,
    input: ICreateOrUpdateEventInputDto
  ): Promise<EventOutputDto> {
    const response = await http.put(`events/${id}`, input);
    return response.data;
  }

  public async delete(id: any): Promise<EventOutputDto> {
    const response = await http.delete(`events/${id}`);
    return response.data;
  }
}

export default new EventService();
