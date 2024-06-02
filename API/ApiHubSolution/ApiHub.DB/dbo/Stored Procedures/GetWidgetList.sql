CREATE PROCEDURE [dbo].[GetWidgetList]
  (  
    @PageNumber INT,
    @PageSize INT,
    @FilterKeys NVARCHAR(MAX),
	@FilterValues NVARCHAR(MAX),
	@OrderByKey NVARCHAR(150)='LocationId',
	@OrderByDirection NVARCHAR(10)='ASC'
	)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT;
    SET @Offset = (@PageNumber - 1) * @PageSize;

    DECLARE @DynamicSQL NVARCHAR(MAX);

    SET @DynamicSQL = 'SELECT WidgetId, Title, Description, WidgetSVG
						FROM     Widgets WHERE 1=1';


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
				(' AND '+ sv.SplitValue+' like ''%'+sv1.SplitValue+'%''') AS FilterString 
				INTO #SplitResultTable
				FROM SplitValues sv
				JOIN SplitValues1 sv1 ON sv.ID = sv1.ID;

			SET @DynamicSQL +=(SELECT STRING_AGG(FilterString, ' ') AS CombinedString FROM #SplitResultTable);
    END

    SET @DynamicSQL += '
    ORDER BY '+@OrderByKey+' '+@OrderByDirection+'
     OFFSET ' + CAST(@Offset AS NVARCHAR(10)) + ' ROWS
    FETCH NEXT ' + CAST(@PageSize AS NVARCHAR(10)) + ' ROWS ONLY;';
	
	PRINT @DynamicSQL;

	SELECT COUNT(WidgetId) TotalCount, @PageNumber PageNumber, @PageSize PageSize FROM Widgets;
    EXEC sp_executesql @DynamicSQL;	
	
END