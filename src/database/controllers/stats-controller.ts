import statsRepository from "../repositories/stats-repository";


class StatsController {

    public async getStatsByDate(date: string) {
        if (date.length != 10) {
            throw new Error("Invalid length");
        }
        const data = await statsRepository.getById(date);
        if (!data) {
            return {
                totalFruitsHarvested: "--",
                totalFlowersPollinated: "--",
                totalGallonsOfWater: "--",
                totalMinutesSatOnBench: "--",
                totalDecorationsCleaned: "--",
                totalAnimalsPetted: "--",
                totalAnimalsFed: "--"
            }
        } else {
            return {
                totalFruitsHarvested: data.totalFruitsHarvested,
                totalFlowersPollinated: data.totalFlowersPollinated,
                totalGallonsOfWater: data.totalGallonsOfWater,
                totalMinutesSatOnBench: data.totalMinutesSatOnBench,
                totalDecorationsCleaned:  data.totalDecorationsCleaned,
                totalAnimalsPetted: data.totalAnimalsPetted,
                totalAnimalsFed: data.totalAnimalsFed
            }
        }
    }

}

export default new StatsController();