
CREATE PROCEDURE DataLookup
	(
	 @LookupId INT 
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
   
    IF(@LookupId = 1) 
	BEGIN 
		(SELECT DataTypeId [Value], DataType [Text], Description as [Description] FROM AttibuteTypes)		
	END
          
END