import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { CACHE_MANAGER } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Cache } from "cache-manager";
import { PrismaService } from "../prisma/prisma.service";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let usersService: UsersService;
  let prismaService: DeepMocked<PrismaService>;
  let cacheManager: DeepMocked<Cache>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        }],
    })
      .useMocker(createMock)
      .compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<DeepMocked<PrismaService>>(PrismaService);
    cacheManager = module.get<DeepMocked<Cache>>(CACHE_MANAGER);
  });

  describe("create", () => {
    const userParam = {
      name: "name",
      email: "email@gmail.com",
    };

    beforeEach(() => {
      prismaService.user.create = jest.fn().mockResolvedValueOnce(userParam);
    });

    it("should call the prisma service", async () => {
      await usersService.create(userParam);
      expect(prismaService.user.create).toHaveBeenCalledTimes(1);
    });

    it("should return the created user", async () => {
      await expect(usersService.create(userParam)).resolves.toStrictEqual(userParam);
    });
  });

  describe("findAll", () => {
    beforeEach(() => {
      prismaService.user.findMany = jest.fn().mockResolvedValueOnce([]);
    });

    it("should call the prisma service", async () => {
      await usersService.findAll();
      expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);
    });

    it("should return all users", async () => {
      await expect(usersService.findAll()).resolves.toStrictEqual([]);
    });
  });

  describe("findOne", () => {
    const idParam = 0;

    describe("if requested value is not cached", () => {
      const user = {
        id: 0,
        name: "name",
        email: "email@gmail.com",
        phone: "0123456789",
      };

      beforeEach(() => {
        prismaService.user.findUniqueOrThrow = jest.fn().mockResolvedValueOnce(user);
      });

      it("should call the prisma service", async () => {
        await usersService.findOne(idParam);
        expect(prismaService.user.findUniqueOrThrow).toHaveBeenCalledTimes(1);
      });

      it("should return one user", async () => {
        await expect(usersService.findOne(idParam)).resolves.toStrictEqual(user);
      });
    });

    describe("if requested user is cached", () => {
      it("should return cached user", async () => {
        const cachedUser = {
          id: 0,
          name: "cached",
          email: "cached@gmail.com",
          phone: "0123456789",
        };
        cacheManager.get.mockResolvedValueOnce(cachedUser);

        await expect(usersService.findOne(idParam)).resolves.toStrictEqual(cachedUser);
      });
    });
  });

  describe("update", () => {
    const idParam = 0;
    const userParam = { name: "updated" };
    const updatedUser = {
      id: idParam,
      name: userParam.name,
      email: "email@gmail.com",
      phone: "0123456789",
    };

    beforeEach(() => {
      prismaService.user.update = jest.fn().mockResolvedValueOnce(updatedUser);
    });

    it("should call prisma service", async () => {
      await usersService.update(idParam, userParam);
      expect(prismaService.user.update).toHaveBeenCalledTimes(1);
    });

    it("should update one user", async () => {
      await expect(usersService.update(idParam, userParam)).resolves.toStrictEqual(updatedUser);
    });
  });

  describe("remove", () => {
    const idParam = 0;
    const deletedUser = {
      id: idParam,
      name: "name",
      email: "email@gmail.com",
      phone: "0123456789",
    };

    beforeEach(() => {
      prismaService.user.delete = jest.fn().mockResolvedValueOnce(deletedUser);
    });

    it("should call prisma service", async () => {
      await usersService.remove(idParam);
      expect(prismaService.user.delete).toHaveBeenCalledTimes(1);
    });

    it("should remove one user", async () => {
      await expect(usersService.remove(idParam)).resolves.toStrictEqual(deletedUser);
    });
  });
});
