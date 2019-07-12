---
id: cli-usage
title: Usage
sidebar_label: Usage
---


After starting, an interactive menu will let you file to be created. Firstly, you'll be asked for the type of the files whether it's a entity or service. Then you'll be prompted with the other options relevant to your selection.

For example, let's go through the steps of the creation of a service.

>Enter service name

 - Enter the desired filename for the service. Spaces are not allowed!
 - The tool will check for the existing filenames in the project and reject if found any.

>Is service open to outside?

- If you choose yes, cli adds swagger tags to service file. 

>Are you going to have a database?
 - If yes, it adds `connectionInstance` method and import to service file.


After answering questions it generates files and set imports which specified at the below.

 - Creates new service with given name into services directory.
 - Adds service export into ``services/index.ts`` file.
 - Creates a new interface file in `src/Interfaces/Services` directory.
 - Create index.ts file into service interface folder.
 - Adds file exports into `src/Interfaces/index.ts` file.
 - Adds service import in `test/Utils/BrokerHelper.ts` file.
 - Adds service into setupBroker method in `test/Utils/BrokerHelper.ts` file.
 - Create service helper into `src/ServiceHelper` directory.
 - Adds service into index in `src/ServiceHelper/index.ts` file.
 - Create service helper test into `test/Unit/ServiceHelper` directory.
 - Create service test into `test/Unit/MicroService` directory.
 - Create integration test into `test/Integration` directory.
 