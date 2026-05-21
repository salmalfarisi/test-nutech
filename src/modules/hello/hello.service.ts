import { Banner } from "../../entities/banners.entities";
import { Service } from "../../entities/services.entities";
import { HelloDto } from "./dto/hello.dto";
import { AppDataSource } from "../../config/database";

export class HelloService {
  async hello(): Promise<HelloDto> {
    return {
      message: "HELLO WORK",
    };
  }

  async seedServices(): Promise<void> {
    const services = [
      {
        service_code: "SVC001",
        service_name: "Express Cleaning",
        service_icon: "https://example.com/icons/cleaning.png",
        service_tariff: 50000,
      },
      {
        service_code: "SVC002",
        service_name: "Quick Laundry",
        service_icon: "https://example.com/icons/laundry.png",
        service_tariff: 30000,
      },
      {
        service_code: "SVC003",
        service_name: "Home Repair",
        service_icon: "https://example.com/icons/repair.png",
        service_tariff: 75000,
      },
      {
        service_code: "SVC004",
        service_name: "Food Delivery",
        service_icon: "https://example.com/icons/food.png",
        service_tariff: 20000,
      },
      {
        service_code: "SVC005",
        service_name: "Car Wash",
        service_icon: "https://example.com/icons/carwash.png",
        service_tariff: 40000,
      },
    ];

    return await AppDataSource.transaction(async (manager) => {
      const repo = manager.getRepository(Service);

      for (const s of services) {
        const user = repo.create({
          serviceCode: s.service_code,
          serviceName: s.service_name,
          serviceIcon: s.service_icon,
          serviceTariff: s.service_tariff,
        });
        await repo.save(user);
      }
    });
  }

  async getServices() {
    const repo = AppDataSource.getRepository(Service);

    const data = await repo.find();
    let result = [];

    for(let x = 0; x < data.length; x++){
      result.push({
        service_code: data[x].serviceCode,
        service_name: data[x].serviceName,
        service_icon: data[x].serviceIcon,
        service_tariff: data[x].serviceTariff,
      })
    }

    return result;
  }

  async seedBanners(): Promise<void> {

    const banners = [
      {
        banner_name: "Mega Cleaning Discount",
        banner_image: "https://example.com/banners/cleaning.jpg",
        description: "Get 50% off on cleaning services",
      },
      {
        banner_name: "Laundry Promo Week",
        banner_image: "https://example.com/banners/laundry.jpg",
        description: "Wash more, pay less",
      },
      {
        banner_name: "Home Repair Deals",
        banner_image: "https://example.com/banners/repair.jpg",
        description: "Fix your home at affordable prices",
      },
      {
        banner_name: "Food Fest",
        banner_image: "https://example.com/banners/food.jpg",
        description: "Discounts on all food deliveries",
      },
      {
        banner_name: "Car Care Special",
        banner_image: "https://example.com/banners/carwash.jpg",
        description: "Premium car wash at low price",
      },
    ];

    return await AppDataSource.transaction(async (manager) => {
      const repo = manager.getRepository(Banner);

      for (const s of banners) {
        const user = repo.create({
          bannerName: s.banner_name,
          bannerImage: s.banner_image,
          description: s.description
        });
        await repo.save(user);
      }
    });
  }

  async getBanners() {
    const repo = AppDataSource.getRepository(Banner);

    const data = await repo.find();
    let result = [];

    for(let x = 0; x < data.length; x++){
      result.push({
        banner_name: data[x].bannerName,
        banner_image: data[x].bannerImage,
        description: data[x].description
      })
    }

    return result;
  }
}