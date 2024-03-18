
const { MongoClient } = require('mongodb');

const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

// MongoDB Connection
async function connectToDatabase() {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client.db(dbName);
}

async function DashboardView() {
    try {
        // Establish MongoDB connection using connectToDatabase() function
        const db = await connectToDatabase();

        // MongoDB aggregation pipeline
        const pipeline = [
            {
                $group: {
                    _id: null,
                    total_client: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
        
                                        { $eq: ["$Role", "USER"] },
                                        { $eq: ["$Is_Active", "1"] }
        
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    total_active_client: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$Role", "USER"] },
                                        // { $eq: ["$license_type", "2"] },
                                        { $gt: [{ $subtract: ["$EndDate", new Date()] }, 0] },
                                        { $eq: ["$Is_Active", "1"] }
        
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    total_expired_client: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$Role", "USER"] },
                                        { $lt: [{ $subtract: ["$EndDate", new Date()] }, 0] },
                                        { $eq: ["$Is_Active", "1"] }
        
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    total_live_client: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$Role", "USER"] },
                                        { $eq: ["$license_type", "2"] },
                                        { $eq: ["$Is_Active", "1"] }
        
        
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    total_active_live: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$Role", "USER"] },
                                        { $eq: ["$license_type", "2"] },
                                        {
                                            $gte: [
                                                {
                                                    $dateToString: {
                                                        format: "%Y-%m-%d",
                                                        date: "$EndDate"
                                                    }
                                                },
                                                {
                                                    $dateToString: {
                                                        format: "%Y-%m-%d",
                                                        date: new Date()
                                                    }
                                                }
                                            ]
                                        },
                                        { $eq: ["$Is_Active", "1"] }
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    total_expired_live: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$Role", "USER"] },
                                        { $eq: ["$license_type", "2"] },
                                        { $lt: [{ $subtract: ["$EndDate", new Date()] }, 0] },
                                        { $eq: ["$Is_Active", "1"] }
        
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    total_demo_client: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$Role", "USER"] },
                                        { $eq: ["$license_type", "1"] },
                                        { $eq: ["$Is_Active", "1"] }
        
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    total_active_demo: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$Role", "USER"] },
                                        { $eq: ["$license_type", "1"] },
                                        {
                                            $gte: [
                                                {
                                                    $dateToString: {
                                                        format: "%Y-%m-%d",
                                                        date: "$EndDate"
                                                    }
                                                },
                                                {
                                                    $dateToString: {
                                                        format: "%Y-%m-%d",
                                                        date: new Date()
                                                    }
                                                }
                                            ]
                                        },
                                        { $eq: ["$Is_Active", "1"] }
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    total_expired_demo: {
        
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$Role", "USER"] },
                                        { $eq: ["$license_type", "1"] },
                                        {
                                            $lt: [
                                                {
                                                    $dateToString: {
                                                        format: "%Y-%m-%d",
                                                        date: "$EndDate"
                                                    }
                                                },
                                                {
                                                    $dateToString: {
                                                        format: "%Y-%m-%d",
                                                        date: new Date()
                                                    }
                                                }
                                            ]
                                        },
                                        { $eq: ["$Is_Active", "1"] }
                                    ]
                                },
                                1,
                                0
                            ]
                        }
        
                    },
                    total_two_days: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$Role", "USER"] },
                                        { $eq: ["$license_type", "0"] },
                                        { $eq: ["$Is_Active", "1"] }
        
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    total_active_two_days: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$Role", "USER"] },
                                        { $eq: ["$license_type", "0"] },
                                        {
                                            $gte: [
                                                {
                                                    $dateToString: {
                                                        format: "%Y-%m-%d",
                                                        date: "$EndDate"
                                                    }
                                                },
                                                {
                                                    $dateToString: {
                                                        format: "%Y-%m-%d",
                                                        date: new Date()
                                                    }
                                                }
                                            ]
                                        },
                                        { $eq: ["$Is_Active", "1"] }
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    total_expired_two_days: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$Role", "USER"] },
                                        { $eq: ["$license_type", "0"] },
                                        { $lt: [{ $subtract: ["$EndDate", new Date()] }, 0] },
                                        { $eq: ["$Is_Active", "1"] }
        
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    used_licence: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$Role", "USER"] },
                                        { $eq: ["$license_type", "2"] }
                                    ]
                                },
                                { $toInt: { $ifNull: ["$licence", "0"] } }, // Convert to integer and provide a default value if $licence is null
                                0
                            ]
                        }
                    },
                    sub_used_licence: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$Role", "SUBADMIN"] }
                                    ]
                                },
                                { $toInt: { $ifNull: ["$licence", "0"] } }, // Convert to integer and provide a default value if $licence is null
                                0
                            ]
                        }
                    }
        
        
                }
            },
        
            {
                $lookup: {
                    from: "companies",
                    pipeline: [],
                    as: "company_info"
                }
            },
            {
                $unwind: "$company_info"
            },
            {
                $project: {
                    total_client: 1,
                    total_active_client: 1,
                    total_expired_client: 1,
                    total_live_client: 1,
                    total_active_live: 1,
                    total_expired_live: 1,
                    total_demo_client: 1,
                    total_active_demo: 1,
                    total_expired_demo: 1,
                    total_two_days: 1,
                    total_active_two_days: 1,
                    total_expired_two_days: 1,
                    used_licence:   {
                            $add: ["$used_licence", "$sub_used_licence"]
                          },
                    licenses: "$company_info.licenses",
                    sub_used_licence: 1,
                    remaining_license: {
                        $subtract: [
                          "$company_info.licenses",
                          {
                            $add: ["$used_licence", "$sub_used_licence"]
                          }
                        ]
                      }
                }
            }
        
        ];

        // Create a MongoDB view named "dashboard_data1"
        await db.createCollection("dashboard_data", { viewOn: "users", pipeline });

        console.error('View created successfully.');

    } catch (error) {
        // Handle errors
        console.error('Error:', error);
    }
}




async function deleteDashboard() {
    try {
        const db = await connectToDatabase();

        // Drop the view if it exists
        await db.collection('dashboard_data').drop();

        console.log('dashboard_data view deleted successfully');

    } catch (error) {
        console.error('Error:', error);
    }
}


module.exports = { DashboardView, deleteDashboard }
 

// db.createView('dashboard_data', 'users', [
//     {
//         $group: {
//             _id: null,
//             total_client: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $and: [

//                                 { $eq: ["$Role", "USER"] },
//                                 { $eq: ["$Is_Active", "1"] }

//                             ]
//                         },
//                         1,
//                         0
//                     ]
//                 }
//             },
//             total_active_client: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $and: [
//                                 { $eq: ["$Role", "USER"] },
//                                 // { $eq: ["$license_type", "2"] },
//                                 { $gt: [{ $subtract: ["$EndDate", new Date()] }, 0] },
//                                 { $eq: ["$Is_Active", "1"] }

//                             ]
//                         },
//                         1,
//                         0
//                     ]
//                 }
//             },
//             total_expired_client: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $and: [
//                                 { $eq: ["$Role", "USER"] },
//                                 { $lt: [{ $subtract: ["$EndDate", new Date()] }, 0] },
//                                 { $eq: ["$Is_Active", "1"] }

//                             ]
//                         },
//                         1,
//                         0
//                     ]
//                 }
//             },
//             total_live_client: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $and: [
//                                 { $eq: ["$Role", "USER"] },
//                                 { $eq: ["$license_type", "2"] },
//                                 { $eq: ["$Is_Active", "1"] }


//                             ]
//                         },
//                         1,
//                         0
//                     ]
//                 }
//             },
//             total_active_live: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $and: [
//                                 { $eq: ["$Role", "USER"] },
//                                 { $eq: ["$license_type", "2"] },
//                                 {
//                                     $gte: [
//                                         {
//                                             $dateToString: {
//                                                 format: "%Y-%m-%d",
//                                                 date: "$EndDate"
//                                             }
//                                         },
//                                         {
//                                             $dateToString: {
//                                                 format: "%Y-%m-%d",
//                                                 date: new Date()
//                                             }
//                                         }
//                                     ]
//                                 },
//                                 { $eq: ["$Is_Active", "1"] }
//                             ]
//                         },
//                         1,
//                         0
//                     ]
//                 }
//             },
//             total_expired_live: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $and: [
//                                 { $eq: ["$Role", "USER"] },
//                                 { $eq: ["$license_type", "2"] },
//                                 { $lt: [{ $subtract: ["$EndDate", new Date()] }, 0] },
//                                 { $eq: ["$Is_Active", "1"] }

//                             ]
//                         },
//                         1,
//                         0
//                     ]
//                 }
//             },
//             total_demo_client: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $and: [
//                                 { $eq: ["$Role", "USER"] },
//                                 { $eq: ["$license_type", "1"] },
//                                 { $eq: ["$Is_Active", "1"] }

//                             ]
//                         },
//                         1,
//                         0
//                     ]
//                 }
//             },
//             total_active_demo: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $and: [
//                                 { $eq: ["$Role", "USER"] },
//                                 { $eq: ["$license_type", "1"] },
//                                 {
//                                     $gte: [
//                                         {
//                                             $dateToString: {
//                                                 format: "%Y-%m-%d",
//                                                 date: "$EndDate"
//                                             }
//                                         },
//                                         {
//                                             $dateToString: {
//                                                 format: "%Y-%m-%d",
//                                                 date: new Date()
//                                             }
//                                         }
//                                     ]
//                                 },
//                                 { $eq: ["$Is_Active", "1"] }
//                             ]
//                         },
//                         1,
//                         0
//                     ]
//                 }
//             },
//             total_expired_demo: {

//                 $sum: {
//                     $cond: [
//                         {
//                             $and: [
//                                 { $eq: ["$Role", "USER"] },
//                                 { $eq: ["$license_type", "1"] },
//                                 {
//                                     $lt: [
//                                         {
//                                             $dateToString: {
//                                                 format: "%Y-%m-%d",
//                                                 date: "$EndDate"
//                                             }
//                                         },
//                                         {
//                                             $dateToString: {
//                                                 format: "%Y-%m-%d",
//                                                 date: new Date()
//                                             }
//                                         }
//                                     ]
//                                 },
//                                 { $eq: ["$Is_Active", "1"] }
//                             ]
//                         },
//                         1,
//                         0
//                     ]
//                 }

//             },
//             total_two_days: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $and: [
//                                 { $eq: ["$Role", "USER"] },
//                                 { $eq: ["$license_type", "0"] },
//                                 { $eq: ["$Is_Active", "1"] }

//                             ]
//                         },
//                         1,
//                         0
//                     ]
//                 }
//             },
//             total_active_two_days: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $and: [
//                                 { $eq: ["$Role", "USER"] },
//                                 { $eq: ["$license_type", "0"] },
//                                 {
//                                     $gte: [
//                                         {
//                                             $dateToString: {
//                                                 format: "%Y-%m-%d",
//                                                 date: "$EndDate"
//                                             }
//                                         },
//                                         {
//                                             $dateToString: {
//                                                 format: "%Y-%m-%d",
//                                                 date: new Date()
//                                             }
//                                         }
//                                     ]
//                                 },
//                                 { $eq: ["$Is_Active", "1"] }
//                             ]
//                         },
//                         1,
//                         0
//                     ]
//                 }
//             },
//             total_expired_two_days: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $and: [
//                                 { $eq: ["$Role", "USER"] },
//                                 { $eq: ["$license_type", "0"] },
//                                 { $lt: [{ $subtract: ["$EndDate", new Date()] }, 0] },
//                                 { $eq: ["$Is_Active", "1"] }

//                             ]
//                         },
//                         1,
//                         0
//                     ]
//                 }
//             },
//             used_licence: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $and: [
//                                 { $eq: ["$Role", "USER"] },
//                                 { $eq: ["$license_type", "2"] }
//                             ]
//                         },
//                         { $toInt: { $ifNull: ["$licence", "0"] } }, // Convert to integer and provide a default value if $licence is null
//                         0
//                     ]
//                 }
//             },
//             sub_used_licence: {
//                 $sum: {
//                     $cond: [
//                         {
//                             $and: [
//                                 { $eq: ["$Role", "SUBADMIN"] }
//                             ]
//                         },
//                         { $toInt: { $ifNull: ["$licence", "0"] } }, // Convert to integer and provide a default value if $licence is null
//                         0
//                     ]
//                 }
//             }


//         }
//     },

//     {
//         $lookup: {
//             from: "companies",
//             pipeline: [],
//             as: "company_info"
//         }
//     },
//     {
//         $unwind: "$company_info"
//     },
//     {
//         $project: {
//             total_client: 1,
//             total_active_client: 1,
//             total_expired_client: 1,
//             total_live_client: 1,
//             total_active_live: 1,
//             total_expired_live: 1,
//             total_demo_client: 1,
//             total_active_demo: 1,
//             total_expired_demo: 1,
//             total_two_days: 1,
//             total_active_two_days: 1,
//             total_expired_two_days: 1,
//             used_licence:   {
//                     $add: ["$used_licence", "$sub_used_licence"]
//                   },
//             licenses: "$company_info.licenses",
//             sub_used_licence: 1,
//             remaining_license: {
//                 $subtract: [
//                   "$company_info.licenses",
//                   {
//                     $add: ["$used_licence", "$sub_used_licence"]
//                   }
//                 ]
//               }
//         }
//     }

// ])