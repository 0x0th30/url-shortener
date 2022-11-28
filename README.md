<h1 align = "center"> URL Shortener </h1>

<h3 align = "center"> 💁 About </h3>
<p>
  Simple project to show my last 6 months developed/improved skills, like OOP concepts, clean code, unit tests, linting, CI and more. The URL Shortener helps you with big links that could be smaller.
 </p>

<br>
 
<h3 align = "center"> ⭐ Features </h3>
<ul>
  <li> Create links to URLs of your choice; </li>
  <li> Use the created links to perform speed redirects. </li>
 </ul>

<br>

<h3 align = "center"> 🎯 Endpoints </h3>
<ul>
  <li> (POST) /create: specify a <strong>url</strong> field in body with your link to short it; </li>
  <li> (GET) /{ìd}: specify the link <strong>id</strong> to perform the redirect. </li>
</ul>

<br>

<h3 align = "center"> ⚙️ Build </h3>
<p>
  The application can be easily build using Docker, being it the only one prerequisite.
</p>

So type `docker compose up --build -d` to build and setup the application (API + postgres database):
![image](https://user-images.githubusercontent.com/61753537/204239642-042141be-cb42-4576-8744-bbea172fbf19.png)
 
To monitor application and database logs, can you type `docker compose logs -f`:
![image](https://user-images.githubusercontent.com/61753537/204240469-c6651d25-20d7-4dbd-8ac0-0149b3b193c6.png)


 
