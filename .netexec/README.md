# .netexec = dotnet executor

* This directory is used as a temporary execution environment for running .NET code.

- A new folder is created inside .netexec for each execution process.
- Project files and source code are placed inside it.
- After execution finishes, the folder is automatically removed.
- The goal is to isolate code execution from the main system.
