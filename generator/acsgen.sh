#acsgenerator

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
	java -jar $swaggerPath generate -i ${splitted[1]} -l typescript-angular -o ${splitted[2]} || error_exit "Swagger error."
	cp -r ${splitted[2]}/model/* ${modelFolder}
	cp -r ${splitted[2]}/configuration.ts ${modelFolder}
	rm -r ${splitted[2]}/model
	rm ${splitted[2]}/configuration.ts
	counterGen=$((counterGen+1))
done <"${docFile}"

>${modelFolder}/models.ts
for filename in ${modelFolder}/*; do
	TEMP=${filename##*[/|\\]}
	if [ ${TEMP%.ts} != "models" ]; then echo "export * from './${TEMP%.ts}';" >> ${modelFolder}/models.ts; fi
	if [ ${TEMP%.ts} != "configuration" ] && [ ${TEMP%.ts} != "models" ]; then sed -i '2d;3d;4d' ${filename}; fi
done

echo -e "\n${GREEN}CODE GENERATION COMPLETED  (${counterGen}/${counterGen})${NC}\n"

counterRep=0

while read line2; do
	counterRep=$((counterRep+1))
	read -r -a repl <<< "$line2"
	echo -e "${counterRep} sed: ${repl[0]}: '${repl[1]}' -> '${repl[2]}'"
	sed -i '' "s@${repl[1]}@${repl[2]}@g" ${repl[0]}
	
done <"${replaceFile}"

echo -e "\n${GREEN}REPLACEMENT COMPLETED  (${counterRep}/${counterRep})${NC}\n"

sleep 5
