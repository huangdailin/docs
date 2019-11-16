# spring框架pom.xml文件解析

> Spring是我们开发JAVA WEB项目最常用的框架之一，这篇就来讲一下，Spring项目中使用maven的pom.xml应该如何配置。

### 一、`maven`的信息部分

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
<modelVersion>4.0.0</modelVersion>
```

头部的信息主要是定义了`xml`的版本，编码格式（`UTF-8`），以及最顶层的`project`标签，另外也定义了`modelVersion`，这里需要注意的是，如果你使用的是`maven2`或者`maven3`，那么这个`modelVersion`只能是`4.0.0`。

### 二、`project`的基本信息

```xml
<name>frBlog</name>
<groupId>com.frweb</groupId>
<artifactId>frBlog</artifactId>
<version>0.0.1-SNAPSHOT</version>
<packaging>war</packaging>
```

`name`是项目的名字。 
`groupId`，`artifactId`和`version`构成了一个`maven`项目的坐标（可以唯一定位一个`maven`项目） 
`version`中的`SNAPSHOT`表示当前版本是一个不稳定的，尚处于开发中的版本 
`packaging`表示项目打包的方式，有以下值：`pom, jar, maven-plugin, ejb, war, ear, rar, par`。通常`web`项目默认的是`war`。

### 三、定义私有仓库`repositories`

`repositories`本来就是仓库的意思，这部分的内容不是必须的，因为`maven`有自己默认的中央仓库，如果我们仅使用中央仓库（没有自己自定义一些`jar`包），而不需要自己的私有仓库的话，是不需要写这一部分的。

```xml
<repositories>
    <repository>
        <id>fr-nexus</id>
        <url>http://nexus.frBlog.com/nexus/content/groups/public/</url>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
    </repository>
</repositories>
```

这里`id`是定义了我们私有仓库的`id` 
`url`这部分是关键，是我们私有仓库的地址（我们使用`Nexus`来创建我们的私有仓库） 
`snapshots`：是否允许下载`SNAPSHOTS`版本，也就是不稳定版本。类似的标签还有`releases`。

### 四、依赖库`dependencies`

这部分可以说是`pom`文件的核心，我们项目中用到的依赖包都要写到这部分里来。

```xml
   <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>3.8.1</version>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>servlet-api</artifactId>
            <version>2.5</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>jsp-api</artifactId>
            <version>2.1</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>
    <dependencies>
```

可以看到这部分的内容其实就是我们上面`project`基本信息的内容。 可以用`groupId`，`artifactId`和`version`来定义唯一的一个`maven`项目 。

另外有个标签`scope`，表明了依赖的范围，这个标签通常有这么几种赋值：

1.  `compile`，也是默认值。它表示这个被依赖的`maven`项目会参与项目编译，测试和运行，打包的话也会将这个项目打包进去。这是一个比较强的依赖范围 。
2.  `test`，表示这个被依赖的`maven`项目仅参与测试代码的编译和运行，比较典型的是`junit` 。
3.  `runtime`，表示被依赖项目无需参与项目的编译，不过后期的测试和运行周期需要其参与。与`compile`相比，跳过编译而已 。
4. `provided`，表示只有当`JDK`或者一个容器已经提供了这个依赖后才使用。例如，如果你开发了一个`web`应用，你可能在编译`classpath`的过程中需要可用的`servlet API`来编译一个`servlet`。但是你不会想要在打包好的`war`文件中包含这个`servlet API`。这个`API`会由你的应用服务器或者`servlet`容器来提供（比如`tomcat`）。也就是说，`provided`依赖在编译`classpath`是可用，他不是传递性的，也不会被打包 。
5. `system`，与`provided`类似，但是你必须显式的提供一个本地`jar`包的路径（`systemPath`）。

### 五、`build`编译部分

```xml
 <build>
        <finalName>cnzz</finalName>
        <defaultGoal>install</defaultGoal>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <configuration>
                    <skip>true</skip>
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>2.5.1</version>
                <configuration>
                    <source>1.6</source>
                    <target>1.6</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
        </plugins>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
            </resource>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                    <include>**/*.properties</include>
                </includes>
            </resource>
        </resources>
    </build>
```

1. `build`标签有两种。

    上面写的这种，是直接在`project`下面的标签，还有一种，是在`profile`下面的标签，这个后面会讲到。 其中，`finalName`是最终编译生成的名字，比如如果最终我们生成了一个`.war`文件，那么这个文件的名字就是`finalName.war` ，`defaultGoal`是执行构建时默认的`goal`或`phase`，如`jar:jar`或者`package`等。

2. `plugins`给出构建过程中所用到的插件。这里我们常用到的插件有：

   - maven-compiler-plugin插件，因为maven的核心插件compile插件默认只支持编译JAVA1.3，如果你要使用java6，必须要使用这个maven-compiler-plugin插件才可以使用JAVA的更高版本。
   - maven-surefire-plugin插件，这个插件用来在maven构建生命周期的test phase执行一个应用的单元测试。使用这个插件后，你可以使用mvn surefire:test或者`mvn test`可以运行工程下的单元测试。

3. `resources`标签，通常这里面放的是我们项目的各种资源，最常见的就是`.properties`文件，用来定义一些编译时用到的变量。 

4. `directory`标签，制定了资源的路径。

5. `filtering`是否开启`filtering`功能。`filtering`主要用来替换项目中的资源文件`（.xml、.properties）`当中的...，比如...，比如`{db.url}`，那么如果配置了`db.url=aaa`的话，在项目编译的时候，就会自动的把`${db.url}`替换为`aaa`。

6. `includes`标签，配置包含了`directory`下面哪些文件，如果不配置`includes`，那就默认包含`directory`的所有文件。

### 六、`profiles`部分

允许在`pom.xml`里面定义若干个`profile`段，然后在编译时选择其中的一个用于覆盖项目文件原先的定义。 
最经常被用来配置不用的环境，比如生产环境和开发环境 
这里我们定义了2个`profile`，分别是`dev`和`prod`。`dev`是开发环境，`prod`是生产环境。 
这样如果我们运行。

`mvn clean compile -P dev`

```xml
<profiles>
        <profile>
            <id>dev</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <build>
                <finalName>cnzz1</finalName>
                <filters>
                    <filter>profile-dev.properties</filter>
                </filters>
                <pluginManagement>
                    <plugins>
                        <plugin>
                            <groupId>org.apache.tomcat.maven</groupId>
                            <artifactId>tomcat7-maven-plugin</artifactId>
                            <version>2.2</version>
                            <configuration>
                                <path>/cnzzdata</path>
                                <port>8888</port>
                                <uriEncoding>UTF-8</uriEncoding>
                                <url>http://localhost:8888/manager/text</url>
                                <server>tomcat8</server>
                                <!--<tomcatLoggingFile>log.txt</tomcatLoggingFile>-->
                                <contextReloadable>true</contextReloadable>
                            </configuration>
                        </plugin>
                    </plugins>
                </pluginManagement>
            </build>
        </profile>
        <profile>
            <id>prod</id>
            <build>
                <finalName>cnzzdata.prod</finalName>
                <filters>
                    <filter>profile-prod.properties</filter>
                </filters>
            </build>
        </profile>
    </profiles>
```

其中，`id`就是`profile`的id，也是我们运行`mvn clean compile -P id`的参数 
`activeByDefault`是指的默认编译环境，如果这个值为`true`，那当我们没有指定使用哪个`profile`的时候，默认就会用`activeByDefault=true`的`profile`。这里我们设置了`dev`的`activeByDefault=true`，所以： 
mvn clean compile = mvn clean compile -P dev 
`profile`里也有`build`标签，这里`build`标签指的是这个`profile`的编译配置，具体内容同上面我们说的`build` 。

### 七、`pluginRepositories`插件仓库 

第三部分“私有仓库repositories”，这里也有一个`Repositories`，不过是`plugin`的`Repositories`，也就是插件的私有仓库 
字段同`repositories`类似。

```xml
	<pluginRepositories>
        <pluginRepository>
            <id>apache.snapshots</id>
            <name>Apache Snapshots</name>
            <url>http://repository.apache.org/content/groups/snapshots-group/</url>
            <releases>
                <enabled>false</enabled>
            </releases>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
        </pluginRepository>
    </pluginRepositories>
```

### 八、`properties`定义常量 

定义了一些常量，用来避免一些重复的东西：

```xml
    <properties>
        <springframework-version>3.2.2.RELEASE</springframework-version>
        <spring.security.version>3.2.3.RELEASE</spring.security.version>
        <spring.version>3.2.11.RELEASE</spring.version>
        <slf4j.version>1.7.5</slf4j.version>
    </properties>
```

在我们上面的`dependency`部分，对应的是这样写的：

```xml
<!-- spring -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>${springframework-version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${springframework-version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-orm</artifactId>
            <version>${springframework-version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>${springframework-version}</version>
            <scope>test</scope>
        </dependency>
```

可以看到，这样就不用定义多次，避免升级`spring`版本的时候漏改。