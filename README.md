# README

## Installation 
1. Run `npm install`
2. Copy `.env.example` to `.env`

## Testing guideline
1. Nazwa testu powinna wskazywać jakie czynności są wykonywane i jaki jest porządany efekt
2. Wskazywać względne ścieżki URL (ścieżka bazowa jest zdefiniowana jako zmienna środowiskowa)
3. Elememnty na stronie wybierać według niezmiennych atrybutów np. :
   - nazwa lub typ elementu, a nie tekst
4. Dane testowe przypisywać do zmiennych zamiast podawać je wprost
5. Stosować zdefiniowane stałe funkcjonujące w systemie (patrz katalog constants)

## Obejście logowania
1. npx playwright codegen --save-storage=XXX.json (gdzie XXX to nazwa pliku)
2. Odwołać się w teście do storageState do XXX.json

## Korzystanie z traces
1. Kiedy test zakończy się niepowodzeniem to wszystkie teaces zapisują się w folderze test-results
2. Aby odpalić traces dla danego testu, który zfailował należy wpisać w terminalu:
3. npx playwright show-trace test-results/XXX/trace.zip gdzie XXX jest nazwą folderu testu, który skończył się failem, a w środku jest plik trace.zip