FILE="./pom.xml"
/bin/cat <<EOM >$FILE
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
<modelVersion>4.0.0</modelVersion>
<groupId>com.redhat.vizuri.summit17</groupId>
<artifactId>domain</artifactId>
<version>0.0.1-SNAPSHOT</version>
<properties>
<nexus.url>"$NEXUS_URL"</nexus.url>
<maven.compiler.target>1.8</maven.compiler.target>
<maven.compiler.source>1.8</maven.compiler.source>
</properties>
<distributionManagement>
<repository>
<id>minishift-nexus-releases</id>
<url>${nexus.url}/repository/maven-releases/</url>
</repository>
<snapshotRepository>
<id>minishift-nexus-snapshots</id>
<url>${nexus.url}/repository/maven-snapshots/</url>
</snapshotRepository>
</distributionManagement>
</project>
EOM
