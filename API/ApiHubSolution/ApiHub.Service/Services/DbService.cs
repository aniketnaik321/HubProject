using Dapper;
using ApiHub.Service.Attributes;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using ApiHub.Service.Services.Contracts;
using ApiHub.Service.DTO.Common;
using ApiHub.Service.DTO;
using System.Net;

namespace ApiHub.Service.Services
{
    [ScopedRegistration]
    public class DbService : IDbService
    {
        private readonly string _connectionString;
        public DbService(IConfiguration configuration)
        {
            // Retrieve the connection string from appsettings.json
            _connectionString = configuration.GetConnectionString("HRLiteDB")!;
        }

        public async Task<DtoPagedResponse<TOutput>> GetPaginatedResultset<TOutput>(DtoPageRequest input, string procedureName)
        {
            using (IDbConnection dbConnection = new SqlConnection(_connectionString))
            {
                dbConnection.Open();

                // Use reflection to get the properties of the input object
                PropertyInfo[] properties = typeof(DtoPageRequest).GetProperties();

                // Create DynamicParameters to store the parameters for the stored procedure
                var parameters = new DynamicParameters();

                // Iterate through the properties and add them as parameters
                foreach (var property in properties)
                {

                    var parameterAttribute = property.GetCustomAttribute<ParameterAttribute>();

                    if (parameterAttribute != null)
                    {
                        if (parameterAttribute.Description != null)
                        {
                            // Add the property name as the parameter name and the property value as the parameter value
                            parameters.Add(parameterAttribute.Description, property.GetValue(input));
                        }
                        else
                        {
                            // Add the property name as the parameter name and the property value as the parameter value
                            parameters.Add(property.Name, property.GetValue(input));
                        }
                    }
                }


                // Execute the stored procedure with multiple result sets
                using (var result = await dbConnection.QueryMultipleAsync(procedureName, parameters, commandType: CommandType.StoredProcedure))
                {
                    // Read the first result set for pagination information
                    var paginationResult = await result.ReadFirstOrDefaultAsync<DtoPagedResponse<TOutput>>();

                    // Read the second result set for the actual data
                    var dataResult = await result.ReadAsync<TOutput>();
                    paginationResult.data = dataResult.ToList();
                    return paginationResult;
                }
            }
        }


        public async Task<List<TOutput>> GetListFromProcedure<TOutput,TInput>(TInput input, string procedureName)
        {
            using (IDbConnection dbConnection = new SqlConnection(_connectionString))
            {
                dbConnection.Open();

                // Use reflection to get the properties of the input object
                PropertyInfo[] properties = typeof(TInput).GetProperties();

                // Create DynamicParameters to store the parameters for the stored procedure
                var parameters = new DynamicParameters();

                // Iterate through the properties and add them as parameters
                foreach (var property in properties)
                {

                    var parameterAttribute = property.GetCustomAttribute<ParameterAttribute>();

                    if (parameterAttribute != null)
                    {
                        if (parameterAttribute.Description != null)
                        {
                            // Add the property name as the parameter name and the property value as the parameter value
                            parameters.Add(parameterAttribute.Description, property.GetValue(input));
                        }
                        else
                        {
                            // Add the property name as the parameter name and the property value as the parameter value
                            parameters.Add(property.Name, property.GetValue(input));
                        }
                    }
                }


                // Execute the stored procedure with multiple result sets
                var result= await dbConnection.QueryAsync<TOutput>(procedureName, parameters, commandType: CommandType.StoredProcedure);
           return result.ToList<TOutput>();
            }
        }


        public async Task<DtoCommonReponse> CallProcedure<T>(T input, string procedureName)
        {
            using (IDbConnection dbConnection = new SqlConnection(_connectionString))
            {
                dbConnection.Open();

                // Use reflection to get the properties of the input object
                PropertyInfo[] properties = typeof(T).GetProperties();

                // Create DynamicParameters to store the parameters for the stored procedure
                var parameters = new DynamicParameters();

                // Iterate through the properties and add them as parameters
                foreach (var property in properties)
                {

                    var parameterAttribute = property.GetCustomAttribute<ParameterAttribute>();

                    if (parameterAttribute != null)
                    {
                        if (parameterAttribute.Description != null)
                        {
                            // Add the property name as the parameter name and the property value as the parameter value
                            parameters.Add(parameterAttribute.Description, property.GetValue(input));
                        }
                        else
                        {
                            // Add the property name as the parameter name and the property value as the parameter value
                            parameters.Add(property.Name, property.GetValue(input));
                        }
                    }
                }
                // Execute the stored procedure using Dapper
                return await dbConnection.QueryFirstAsync<DtoCommonReponse>(procedureName, parameters, commandType: CommandType.StoredProcedure);
            }
        }


        public async Task<IEnumerable<T>> CallProcedure<T>(string procedureName)
        {
            using (IDbConnection dbConnection = new SqlConnection(_connectionString))
            {
                dbConnection.Open();
                // Create DynamicParameters to store the parameters for the stored procedure
                var parameters = new DynamicParameters();

              
                // Execute the stored procedure using Dapper
                return await dbConnection.QueryAsync<T>(procedureName, parameters, commandType: CommandType.StoredProcedure);
            }
        }


        public async Task<List<List<DtoLookup>>> GetDataLookupResults(string lookupId, string procedureName= "DataLookup")
        {
            using (IDbConnection dbConnection = new SqlConnection(_connectionString))
            {
                dbConnection.Open();

                var gridReader = dbConnection.QueryMultiple(
                    procedureName,
                    new { LookupId = lookupId },
                    commandType: CommandType.StoredProcedure
                );

                // Read and store each result set
                var resultSetList = new List<List<DtoLookup>>();
                int resultSetIndex = 0;
                while (gridReader.IsConsumed==false)
                {
                    var result = await gridReader.ReadAsync<DtoLookup>();

                    if (result != null)
                    {
                        resultSetList.Add(result.ToList());
                        resultSetIndex++;
                    }
                    else
                    {
                        // No more result sets
                        break;
                    }
                }
                return resultSetList;
            }
        }


        public async Task<List<Dictionary<string, string>>> GetMachineEventsWithAttributes(long machineId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@MachineID", machineId, DbType.Int64);

                var result =await connection.QueryAsync<dynamic>(
                    "GetMachineEventsWithAttributes",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );
                // Convert the result to List<Dictionary<string, string>>
                var resultList = new List<Dictionary<string, string>>();
                foreach (var row in result)
                {
                    var dictionary = new Dictionary<string, string>();
                    var expandoDict = (IDictionary<string, object>)row;
                    foreach (var keyValuePair in expandoDict)
                    {
                        dictionary.Add(keyValuePair.Key, Convert.ToString(keyValuePair.Value));
                    }
                    resultList.Add(dictionary);
                }
                return resultList;
            }
        }
    }
    }

