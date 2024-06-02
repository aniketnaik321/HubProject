CREATE PROCEDURE [dbo].[GetMachineListWithFilters]
  (  
    @PageNumber INT,
    @PageSize INT,
    @FilterKeys NVARCHAR(MAX),
	@FilterValues NVARCHAR(MAX),
	@OrderByKey NVARCHAR(150)='MachineId',
	@OrderByDirection NVARCHAR(10)='ASC'
	)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT;
    SET @Offset = (@PageNumber - 1) * @PageSize;

    DECLARE @DynamicSQL NVARCHAR(MAX);

    SET @DynamicSQL = 'SELECT Machine.Name, Machine.Description, Machine.CategoryId, Machine.CreatedOn, Category.CategoryName, Category.Description AS CategoryDescription,  Location.LocationTitle, Location.LocationDetail, 
                  Machine.MachineId, Machine.CreatedBy
					FROM     Machine LEFT JOIN
                  Category ON Machine.CategoryId = Category.CategoryId LEFT JOIN
                  Location ON Machine.LocationId = Location.LocationId WHERE 1=1';


    IF ((@FilterKeys IS NOT NULL) AND (@FilterKeys<>''))
   BEGIN

   IF OBJECT_ID('tempdb..#SplitResultTable') IS NOT NULL
		DROP TABLE #SplitResultTable;

			WITH SplitValues AS (
				SELECT ROW_NUMBER() OVER (ORDER BY (select 0)) AS ID, value AS SplitValue
				FROM STRING_SPLIT(@FilterKeys, ',')
				), SplitValues1 AS (
				SELECT ROW_NUMBER() OVER (ORDER BY (select 0)) AS ID, value AS SplitValue
				FROM STRING_SPLIT(@FilterValues, ',')
				)
				SELECT sv.ID, sv.SplitValue FilterKey, sv1.SplitValue FilterValue, 
				(' AND '+ 'Machine.'+sv.SplitValue+' like ''%'+sv1.SplitValue+'%''') AS FilterString 
				INTO #SplitResultTable
				FROM SplitValues sv
				JOIN SplitValues1 sv1 ON sv.ID = sv1.ID;

			SET @DynamicSQL +=(SELECT STRING_AGG(FilterString, ' ') AS CombinedString FROM #SplitResultTable);
    END
	ELSE IF(@FilterValues <> '') BEGIN
		SET @DynamicSQL += ' AND Machine.Name like ''%'+@FilterValues+'%''  OR CategoryName like ''%'+@FilterValues+'%'' OR LocationTitle like ''%'+@FilterValues+'%'' OR LocationDetail like ''%'+@FilterValues+'%''';
	END

    SET @DynamicSQL += '
    ORDER BY '+@OrderByKey+' '+@OrderByDirection+'
     OFFSET ' + CAST(@Offset AS NVARCHAR(10)) + ' ROWS
    FETCH NEXT ' + CAST(@PageSize AS NVARCHAR(10)) + ' ROWS ONLY;';
	
	PRINT @DynamicSQL;

	SELECT COUNT(MachineId) TotalCount, @PageNumber PageNumber, @PageSize PageSize FROM Machine;
    EXEC sp_executesql @DynamicSQL;	
	
END