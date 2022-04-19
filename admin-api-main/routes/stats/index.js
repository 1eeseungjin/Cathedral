const router = require("express").Router();
const { db } = require("../../config");

router.post('/stats', async (req, res) => {
    console.log(req.body)
    let stats = await new Promise(resolve => {
        db().query(`select * from temple`, (e, rows) => {
            resolve(rows);
        });
    });
    if (stats) {
        if (req.body.isTemple) { // 본당
            res.json({
                stats: stats
            })
        } else {
            let regions = new Set(); // region 끼리 분류한 집합
            let stats_array = [];
            for (stat of stats) {
                if (!regions.has(stat.region)) {
                    regions.add(stat.region);
                    stats_array.push({
                        position: stat.region,
                        accessRate: stat.accessRate,
                        executeRate: stat.executeRate,
                        participateRate: stat.participateRate,
                        temparature: stat.temparature,
                        count: 1
                    });
                } else {
                    const isRegion = (element) => (element.poisition = stat.region);
                    let index = stats_array.findIndex(isRegion);
                    console.log(index);
                    let num = stats_array[index].count;

                    stats_array[index].accessRate = (stats_array[index].accessRate * num + stat.accessRate) / (num + 1);
                    stats_array[index].executeRate = (stats_array[index].executeRate * num + stat.executeRate) / (num + 1);
                    stats_array[index].participateRate = (stats_array[index].participateRate * num + stat.participateRate) / (num + 1);
                    stats_array[index].temparature = (stats_array[index].temparature * num + stat.temparature) / (num + 1);
                    stats_array[index].count += 1;
                }
                console.log(stats_array);
            }

            res.json({
                stats: stats_array
            })
        }
    } else {
        res.json({
            stats: []
        })
    }

});



module.exports = router;