

--DECLARE @SampleData [dbo].[AttributeTableType];
--INSERT INTO @SampleData (MachineId, AttributeId, AttributeValue, ColId)
--VALUES
--    (1, 101, 'Value1', 1),
--    (1, 102, '23', 8),
--    (1, 101, 'Value3', 3),
--    (1, 102, 'Value4', 4);

---- Execute the stored procedure with the table-valued parameter
--EXEC AddMachineEvent @AttributeData = @SampleData;


CREATE PROCEDURE [dbo].[AddMachineEvent]
    @AttributeData AttributeTableType READONLY
AS
BEGIN
    -- Declare variables
    DECLARE @DynamicSQL NVARCHAR(MAX);
    DECLARE @ColId INT;
    DECLARE @AttributeName NVARCHAR(100); -- Adjust the size based on your needs
	DECLARE @AttributeValue NVARCHAR(100);
	DECLARE @MachineId BIGINT;

    -- Create a temporary table to store dynamic column information
    CREATE TABLE #DynamicColumns
    (
        ColId INT,
		MachineId BIGINT,
        ColName NVARCHAR(100),
		ColValue NVARCHAR(100)-- Adjust the size based on your needs
    );

    -- Declare a cursor to iterate through @AttributeData
    DECLARE AttributeCursor CURSOR FOR
        SELECT ColId, 'Col' + CONVERT(NVARCHAR(10), ColId) AS ColName, AttributeValue,MachineId
        FROM @AttributeData;

    OPEN AttributeCursor;

    -- Fetch the first row from the cursor
    FETCH NEXT FROM AttributeCursor INTO @ColId, @AttributeName, @AttributeValue,@MachineId;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Insert dynamic column information into the temporary table
        INSERT INTO #DynamicColumns (ColId, ColName, ColValue, MachineId) VALUES (@ColId, @AttributeName, @AttributeValue,@MachineId);

        -- Fetch the next row from the cursor
        FETCH NEXT FROM AttributeCursor INTO @ColId, @AttributeName,@AttributeValue,@MachineId;
    END;

    -- Close and deallocate the cursor
    CLOSE AttributeCursor;
    DEALLOCATE AttributeCursor;

    -- Construct dynamic SQL to insert values into MachineEventsCrosstab
    SET @DynamicSQL = N'
        INSERT INTO [dbo].[MachineEventsCrosstab] (MachineId, EntryDate,EffectiveDate, ' +
        STUFF((SELECT ', ' + ColName
               FROM #DynamicColumns
               FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 2, '') + ')
        SELECT
            [MachineId],
            GETDATE(),GETDATE(),
            ' +
        STUFF((SELECT ', MAX(CASE WHEN ColId = ' + CONVERT(NVARCHAR(10), ColId) + ' THEN [ColValue] END) AS ' + ColName
               FROM #DynamicColumns
               FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 2, '') + '
        FROM #DynamicColumns
        GROUP BY [MachineId]';

    -- Execute dynamic SQL to insert values into MachineEventsCrosstab
    EXEC sp_executesql @DynamicSQL;

    -- Drop the temporary table
    DROP TABLE #DynamicColumns;
END;