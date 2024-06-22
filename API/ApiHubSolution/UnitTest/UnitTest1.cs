using ApiHub.Service.Services.Implementations;

namespace UnitTest
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {

            FileService fs=new FileService();
            fs.CreateFolder("root", "HubTestFolder");

            Assert.Pass();
        }
    }
}