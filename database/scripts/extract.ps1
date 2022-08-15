param (
    [Parameter(Mandatory=$true)]$server,
    [Parameter(Mandatory=$true)]$username    
)

$password = Read-Host "Azure SQL Password" -asSecureString

$sqlPackage="'C:\Program Files\Microsoft SQL Server\160\DAC\bin\SqlPackage.exe'"
$dacpac="./database/dacpac/my-static-db.dacpac"

$PwdPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
$PlainTextPassword = [Runtime.InteropServices.Marshal]::PtrToStringAuto($PwdPointer)
[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($PwdPointer)

Invoke-Expression "& $sqlPackage /a:extract /scs:""Data Source=$server.database.windows.net;Initial Catalog=my-static-db;UID=$username;PWD=$PlainTextPassword"" /tf:$dacpac"