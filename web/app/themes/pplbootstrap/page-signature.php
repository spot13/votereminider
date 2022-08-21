<?php
/* Template name: Page signature */

get_header(); ?>

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

	<div class="col-lg-8 col-md-8 col-sm-8 white">
		<div class="row">
			<div class='breadcrumbs'>
				<?php if(function_exists('bcn_display') && !is_front_page()) {
					bcn_display();
					}?>
			</div>
		</div>
		<article class="clearfix">
		<h1><?php the_title(); ?></h1>
		<?php the_content(); ?>


<nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">HTML (Desktop & Web Apps)</a>
    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Plain Text (iOS and Android Apps)</a>
  </div>
</nav>

<!--Tab 1-->
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
<div style="padding:10px; border:1px solid #000; font-family:arial; color:#000;">
<strong style="color:#55a1a2"><?php if (isset($_GET['staffname'])) { echo $_GET['staffname']; }else{ echo 'Fname Lname, Accreditation / Pronouns (if applicable)';} ?> <?php if(!empty($_GET['pronouns'])){ echo ' (' . $_GET['pronouns'] . ')';}?></strong><br />
<?php if (isset($_GET['staffjobtitle'])) { echo $_GET['staffjobtitle']; }else{ echo 'Job Title';} ?><br />
Pickering Public Library<br />
<br />
T: <a style="color:#317f81;" href="tel:<?php if (isset($_GET['staffphone'])) { echo $_GET['staffphone']; }else{ echo '905-831-6265';} ?><?php if(!empty($_GET['staffext'])){ ?>,<?php if (isset($_GET['staffext'])) { echo $_GET['staffext']; }else{ echo '';} ?><?php }; ?>"><?php if (isset($_GET['staffphone'])) { echo $_GET['staffphone']; }else{ echo '905-831-6265';} ?></a> <?php if(!empty($_GET['staffext'])){ ?>ext. <?php if (isset($_GET['staffext'])) { echo $_GET['staffext']; }else{ echo '';} ?><?php }; ?><br />
<?php if(!empty($_GET['staffmobile'])){ ?>C: <a style="color:#317f81;" href="tel:<?php if (isset($_GET['staffmobile'])) { echo $_GET['staffmobile']; }else{ echo '905-831-6265';} ?>"><?php }; ?><?php if (isset($_GET['staffmobile'])) { echo $_GET['staffmobile']; }else{ echo '';} ?><?php if(!empty($_GET['staffmobile'])){ ?></a><br /><?php }; ?>
E: <?php if (isset($_GET['staffemail'])) { echo '<a style="color:#317f81;" href=" mailto:' . strtolower($_GET['staffemail']) . '">' . strtolower($_GET['staffemail']) . '</a>'; }else{ echo '<a style="color:#317f81;" href=" mailto:yourname@pickeringlibrary.ca">fname.lname@trca.ca</a>';} ?><br />
A: <a style="color:#317f81;" target="_blank" href="https://www.google.com/maps/search/?api=1&query=<?php if (isset($_GET['staffofficeloc'])) { echo $_GET['staffofficeloc']; }else{ echo 'One the Esplanade, Pickering, ON, L1V 2R6';} ?>"><?php if (isset($_GET['staffofficeloc'])) { echo $_GET['staffofficeloc']; }else{ echo 'One the Esplanade, Pickering, ON, L1V 2R6';} ?></a> | <a style="color:#317f81;" target="_blank" href="https://pickeringlibrary.ca">pickeringlibrary.ca</a><br />
<br /><a style="color:#317f81;" href="https://pickeringlibrary.ca"><img src="https://pickeringlibrary.ca/wp-content/uploads/sites/76/2022/04/ppl-logo-signature.png" height="55" alt="Pickering Public Library" /></a><br />
<br />
<a href="https://www.facebook.com/pickeringlibs/" target="_blank"><img src="https://pickeringlibrary.ca/wp-content/uploads/sites/76/2022/04/sm-icon-fb-sm.png" height="27" alt="Facebook" /></a><a href="https://twitter.com/pickeringlibs" target="_blank"><img src="https://pickeringlibrary.ca/wp-content/uploads/sites/76/2022/04/sm-icon-twitter-sm.png" height="27" alt="Twitter" /></a><a href="https://www.instagram.com/pickeringlibs/" target="_blank"><img src="https://pickeringlibrary.ca/wp-content/uploads/sites/76/2022/04/ppl-logo-instagram-sm.png" height="27" alt="Instagram" /></a><img src="https://pickeringlibrary.ca/wp-content/uploads/sites/76/2022/04/ppl-logo-snap-sm.png" height="27" alt="Snap" />
</div>
</div>


<!--Tab 2-->
<div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

<textarea style=" width:100%; min-height:350px; padding:10px;  border:1px solid #000">
<?php if (isset($_GET['staffname'])) { echo $_GET['staffname']; }else{ echo 'Fname Lname, Accreditation / Pronouns (if applicable)';} ?><?php if(!empty($_GET['pronouns'])){ echo ' (' . $_GET['pronouns'] . ')';}?>

<?php if (isset($_GET['staffjobtitle'])) { echo $_GET['staffjobtitle']; }else{ echo 'Job Title';} ?>

<?php echo 'Pickering Public Library'; ?>

<?php echo '&nbsp;' ?>
<?php echo '&nbsp;' ?>

T:&nbsp;<?php if (isset($_GET['staffphone'])) { echo $_GET['staffphone']; }else{ echo '905-831-6265';} ?><?php if(!empty($_GET['staffext'])){ ?> ext. <?php if (isset($_GET['staffext'])) { echo $_GET['staffext']; }else{ echo '';} ?><?php }; ?>
<?php if(!empty($_GET['staffmobile'])){ ?>

<?php if(!empty($_GET['staffmobile'])){ ?>C: <?php }; ?><?php if (isset($_GET['staffmobile'])) { echo $_GET['staffmobile']; }else{ echo '905-831-6265';} ?>
<?php }; ?>

E: <?php if (isset($_GET['staffemail'])) { echo strtolower($_GET['staffemail']); }else{ echo 'yourname@pickeringlibrary.ca';} ?>

A: <?php if (isset($_GET['staffofficeloc'])) { echo $_GET['staffofficeloc']; }else{ echo 'One the Esplanade, Pickering, ON, L1V 2R6';} ?> | pickeringlibrary.ca

Pickering Public Library

</textarea>
</div>
</div>

<br />
<a href="?"><input type="button" class="gform_button button btn btn-warning" value="Reset signature"></a>

				</div>

		</article>
		<?php
		get_template_part("part", "downloads");
		if ('open' == $post->comment_status) {
			 comments_template( '', true ); 
		}
		?>
	</div> 

	<div class="col-lg-4 col-md-4 col-sm-4" id="sidebar">
		<h2 class="sr-only">Sidebar</h2>
		<?php 
		if ( has_post_thumbnail( $id )){	
			the_post_thumbnail('large', array('class'=>'img img-responsive')); 
			echo wpautop( "<span class='news_date'>".get_post_thumbnail_caption()."</span>" );
		}
		get_template_part("part", "sidebar");
		get_template_part("part", "related");
		?>	
	</div>
	
<?php endwhile; ?>

<?php get_footer(); ?>