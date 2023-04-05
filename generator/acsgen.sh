#!/bin/bash

NG_VERSION=12.2.16
configurationFile="./config"
source $configurationFile

CYAN='\033[0;36m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'
IFS='#'

error_exit()
{
	echo -e "${RED}$1${NC}"
	read -n1 -r -p "Press any key to continue..."
	exit 1
}

wd=$(basename `pwd`)
if [ ${wd} == "generator" ]; then
  echo -e "${CYAN}CLIENT SERVICES GENERATOR${NC}\n"
else
  error_exit "Please, run this script in ./generator"
fi

echo -e "Configuration:\nswaggerPath:\t'${swaggerPath}'\ndocFile:\t'${docFile}'\nreplaceFile:\t'${replaceFile}'\nlanguage:\t'typescript-angular'\nmodelFolder:\t'${modelFolder}'\nlogFolder:\t'NO'\n"

counterGen=0

if [ -f ${modelFolder/*} ]; then rm -r ${modelFolder}/*; fi

while read line; do
	read -r -a splitted <<< "$line"
	echo -e "${CYAN}Swagger: generating '${splitted[0]}'${NC}"
	if [ -d ${splitted[2]} ]; then rm -r ${splitted[2]}; fi
	java -jar $swaggerPath generate -i ${splitted[1]} -l typescript-angular -o ${splitted[2]} --additional-properties ngVersion=$NG_VERSION || error_exit "Swagger error."
	
	# move every model inside each ng module into the model folder
	cp -r ${splitted[2]}/model/* ${modelFolder}
	cp -r ${splitted[2]}/configuration.ts ${modelFolder}

	# remove the model folder inside each ng module
	# rm -r ${splitted[2]}/model
	# rm ${splitted[2]}/configuration.ts
	counterGen=$((counterGen+1))
done <"${docFile}"

# export every model inside models folder into models.ts file
>${modelFolder}/models.ts
for filename in ${modelFolder}/*; do
	TEMP=${filename##*[/|\\]}
	if [ ${TEMP%.ts} != "models" ]; then echo "export * from './${TEMP%.ts}';" >> ${modelFolder}/models.ts; fi
	if [ ${TEMP%.ts} != "configuration" ] && [ ${TEMP%.ts} != "models" ]; then sed -i '2d;3d;4d' ${filename}; fi
done

echo -e "\n${GREEN}CODE GENERATION COMPLETED  (${counterGen}/${counterGen})${NC}\n"


# NOTE: DEPRECATED, tsconfig type aliases are not recommended for libraries.

# the following code is used to replace the model imports in each generated ng module from swagger with the alias path 'acs-models' defined in:
# 1. tsconfig.json (for development purposes);
# 2. tsconfig.lib.prod.json (required for the correct use of the library in the production environment)
# 3. tsconfig.lib.json
# 
# Example: 
# import { AssetTag } from '../../../models/assetTag'; ======> import { AssetTag } from 'acs-models';

# counterRep=0
# while read line2; do
# 	counterRep=$((counterRep+1))
# 	read -r -a repl <<< "$line2"
# 	echo -e "${counterRep} sed: ${repl[0]}: '${repl[1]}' -> '${repl[2]}'"
# 	sed -i "s@${repl[1]}@${repl[2]}@g" ${repl[0]} #WINDOWS
# 	# sed -i '' "s@${repl[1]}@${repl[2]}@g" ${repl[0]} #MAC/LINUX
	
# done <"${replaceFile}"

# echo -e "\n${GREEN}REPLACEMENT COMPLETED  (${counterRep}/${counterRep})${NC}\n"
