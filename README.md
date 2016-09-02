inspectorSLACK
==============

> Dumb tool to iterate over large JSON object collection and tell about its most interesting characteristics.


Syntax
------

    inspect(iterableObject [, pickAddresses [, maxVals])


### Parameters:

  * **iterableObject:** Iterable object to analyze.

  * **pickAddresses:** Array of paths (beginning label of each output item) to pick ALL distinct values.

  * **maxVals:** All paths having less distinct values will display them automatically. (Default 5)


### Return value:

Array of strings with some useful information about its contents:

  * Self-explanatory "full" address.
  * Guessed types.
    - Arrays and Objects are displayed in UPPERCASE because they can contain nested data.
    - Array + another type means that it can be an Array or a single item but info is always about items.


Usage example:
--------------

> Install from npm: `npm install inspectorslack`


    var inspect = require("inspectorslack");

    var data = [ // Thanks to https://adobe.github.io/Spry/samples/data_region/JSONDataSetSample.html
        {
            "id": "0001",
            "type": "donut",
            "name": "Cake",
            "ppu": 0.55,
            "batters":
                {
                    "batter":
                        [
                            { "id": "1001", "type": "Regular" },
                            { "id": "1002", "type": "Chocolate" },
                            { "id": "1003", "type": "Blueberry" },
                            { "id": "1004", "type": "Devil's Food" }
                        ]
                },
            "topping":
                [
                    { "id": "5001", "type": "None" },
                    { "id": "5002", "type": "Glazed" },
                    { "id": "5005", "type": "Sugar" },
                    { "id": "5007", "type": "Powdered Sugar" },
                    { "id": "5006", "type": "Chocolate with Sprinkles" },
                    { "id": "5003", "type": "Chocolate" },
                    { "id": "5004", "type": "Maple" }
                ]
        },
        {
            "id": "0002",
            "type": "donut",
            "name": "Raised",
            "ppu": 0.55,
            "batters":
                {
                    "batter":
                        [
                            { "id": "1001", "type": "Regular" },
                            { "id": "1002", "type": "Chocolate" }
                        ]
                },
            "topping":
                [
                    { "id": "5001", "type": "None" },
                    { "id": "5012", "type": "Glazed+" },
                    { "id": "5015", "type": "Sugar+" },
                    { "id": "5013", "type": "Chocolate+" },
                    { "id": "5014", "type": "Maple+" }
                ]
        },
        {
            "id": "0003",
            "type": "donut",
            "name": "Old Fashioned",
            "ppu": 0.55,
            "batters":
                {
                    "batter": { "id": "1001", "type": "Regular" }
                    // Notice is NOT an array (typical in conversions from fucking XML)
                },
            "topping":
                [
                    { "id": "5001", "type": "None" },
                    { "id": "5002", "type": "Glazed" },
                    { "id": "5003", "type": "Chocolate" },
                    { "id": "5004", "type": "Maple" }
                ]
        }
    ];

    console.log(inspect(data, [
        "topping.type", // Make all distinct values to be displayed.
        /// ...
    ]).join("\n"));


### Output:

    id: number - 3 (100%) VALUES: [0001, 0002, 0003]
    type: string - 3 (100%) VALUES: [donut]
    name: string - 3 (100%) VALUES: [Cake, Raised, Old Fashioned]
    ppu: number - 3 (100%) VALUES: [0.55]
    batters: OBJECT - 3 (100%)
      batters.batter: ARRAY, OBJECT - 7 (233.33%)
        batters.batter.id: number - 7 (100%) VALUES: [1001, 1002, 1003, 1004]
        batters.batter.type: string - 7 (100%) VALUES: [Regular, Chocolate, Blueberry, Devil's Food]
    topping: ARRAY - 16 (533.33%)
      topping.id: number - 16 (100%)
      topping.type: string - 16 (100%) DATA: [None, Glazed, Sugar, Powdered Sugar, Chocolate with Sprinkles, Chocolate, Maple, Glazed+, Sugar+, Chocolate+, Maple+]



<a name="contributing"></a>Contributing
---------------------------------------

If you are interested in contributing with this project, you can do it in many ways:

  * Creating and/or mantainig documentation.

  * Implementing new features or improving code implementation.

  * Reporting bugs and/or fixing it.
  
  * Sending me any other feedback.

  * Whatever you like...
    
Please, contact-me, open issues or send pull-requests thought [this project GIT repository](https://github.com/bitifet/inspectorslack)

