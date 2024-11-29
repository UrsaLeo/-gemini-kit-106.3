rem This takes care of the complexity where you want to include all the dependencies for the measure
rem tool but not load it upfront due to a blocking issue

copy /y ".\source\apps\my_company.my_editor.kit"    ".\source\apps\my_company.my_editor.kit.bak"

echo [dependencies] >>.\source\apps\my_company.my_editor.kit
echo "omni.kit.tool.measure" = {} >>.\source\apps\my_company.my_editor.kit

call ".\repo" "build"
call ".\update"

copy  /y ".\source\apps\my_company.my_editor.kit.bak"  ".\source\apps\my_company.my_editor.kit"

del ".\source\apps\my_company.my_editor.kit.bak"

copy /y _build\windows-x86_64\release\my_company.my_editor.kit.bat _build\windows-x86_64\release\my_company.my_editor.bat