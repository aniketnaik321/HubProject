
CREATE PROCEDURE [dbo].[GetAllUsers]
  (  
    @PageNumber INT=1,
    @PageSize INT=3,
    @FilterKeys NVARCHAR(MAX),
	@FilterValues NVARCHAR(MAX),
	@OrderByKey NVARCHAR(150)='UserId',
	@OrderByDirection NVARCHAR(10)='ASC'
  )
AS
BEGIN
    SET NOCOUNT ON;
 
    DECLARE @Offset INT;
    SET @Offset = (@PageNumber - 1) * @PageSize;
 
    DECLARE @DynamicSQL NVARCHAR(MAX);
 
    SET @DynamicSQL = 'SELECT Users.UserId, Users.UserName, Users.FullName, Users.EmailId
						FROM  Users    WHERE 1=1 ';
 
    IF ((@FilterKeys IS NOT NULL) AND (@FilterKeys<>''))
    BEGIN
        IF OBJECT_ID('tempdb..#SplitResultTable') IS NOT NULL
            DROP TABLE #SplitResultTable;
 
        WITH SplitValues AS (
            SELECT ROW_NUMBER() OVER (ORDER BY (SELECT 0)) AS ID, value AS SplitValue
            FROM STRING_SPLIT(@FilterKeys, ',')
        ), SplitValues1 AS (
            SELECT ROW_NUMBER() OVER (ORDER BY (SELECT 0)) AS ID, value AS SplitValue
            FROM STRING_SPLIT(@FilterValues, ',')
        )
        SELECT sv.ID, sv.SplitValue FilterKey, sv1.SplitValue FilterValue, 
        (' AND '+ sv.SplitValue+' LIKE ''%'+sv1.SplitValue+'%''') AS FilterString 
        INTO #SplitResultTable
        FROM SplitValues sv
        JOIN SplitValues1 sv1 ON sv.ID = sv1.ID;

        SET @DynamicSQL += (SELECT STRING_AGG(FilterString, ' ') AS CombinedString FROM #SplitResultTable);
    END
 
    SET @DynamicSQL += '
    ORDER BY '+@OrderByKey+' '+@OrderByDirection+'
    OFFSET ' + CAST(@Offset AS NVARCHAR(10)) + ' ROWS
    FETCH NEXT ' + CAST(@PageSize AS NVARCHAR(10)) + ' ROWS ONLY;';
	PRINT @DynamicSQL;
 
	SELECT COUNT(UserId) TotalCount, @PageNumber PageNumber, @PageSize PageSize FROM Users;
    EXEC sp_executesql @DynamicSQL;	
END